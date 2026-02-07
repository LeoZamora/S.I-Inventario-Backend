import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetalleMovimientoInventario } from "src/modules/movimientos/entities/DetalleMovimientoInventario.entity";
import { TipoMovimientoInventario } from "src/modules/movimientos/entities/TipoMovimientoInventario.entity";
import { Ordenes } from "src/modules/ordenes/entities/Ordenes.entity";

@Index("IX_MovimientoInventario_TipoMovimiento", ["idTipoMovimiento"], {})
@Index("PK_MovimientoInventario", ["idMovInv"], { unique: true })
@Entity("MovimientoInventario", { schema: "dbo" })
export class MovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idMovInv" })
  idMovInv: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaMovimiento", default: () => "getdate()" })
  fechaMovimiento: Date;

  @Column("int", { name: "idTipoMovimiento" })
  idTipoMovimiento: number;

  @Column("int", { name: "idOrden", nullable: true })
  idOrden: number;

  @Column("int", { name: "idOrdenEntrada", nullable: true })
  idOrdenEntrada: number | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(
    () => DetalleMovimientoInventario,
    (detalleMovimientoInventario) => detalleMovimientoInventario.movimientoInventario
  )
  detalleMovimientoInventarios: DetalleMovimientoInventario[];

  @ManyToOne(
    () => TipoMovimientoInventario,
    (tipoMovimientoInventario) => tipoMovimientoInventario.movimientoInventarios
  )
  @JoinColumn([
    { name: "idTipoMovimiento", referencedColumnName: "idTipoMovimiento" },
  ])
  tipoMovimiento: TipoMovimientoInventario;

  @ManyToOne(
    () => Ordenes,
    (ordenes) => ordenes.movimientoInventario
  )
  @JoinColumn([
    { name: "idOrden", referencedColumnName: "idOrden" },
  ])
  orden: Ordenes;
}
