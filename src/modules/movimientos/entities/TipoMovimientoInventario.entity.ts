import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";

@Index("PK_TipoMovimientoInventario", ["idTipoMovimiento"], { unique: true })
@Entity("TipoMovimientoInventario", { schema: "dbo" })
export class TipoMovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoMovimiento" })
  idTipoMovimiento: number;

  @Column("varchar", { name: "nombreMovimiento", length: 50 })
  nombreMovimiento: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(
    () => MovimientoInventario,
    (movimientoInventario) => movimientoInventario.tipoMovimiento
  )
  movimientoInventarios: MovimientoInventario[];
}
