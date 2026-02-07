import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DetalleMovimientoInventario } from "src/modules/movimientos/entities/DetalleMovimientoInventario.entity";
import { TipoMovimientoInventario } from "src/modules/movimientos/entities/TipoMovimientoInventario.entity";
import { Ordenes } from "src/modules/ordenes/entities/Ordenes.entity";

@Index("IX_MovimientoInventario_TipoMovimiento", ["idTipoMovimiento"], {})
@Index("PK_MovimientoInventario", ["idMovInv"], { unique: true })
@Entity("MovimientoInventario", { schema: "dbo" })
@ObjectType()
export class MovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idMovInv" })
  @Field(() => Int)
  idMovInv: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaMovimiento", default: () => "getdate()" })
  @Field()
  fechaMovimiento: Date;

  @Column("int", { name: "idTipoMovimiento" })
  @Field(() => Int)
  idTipoMovimiento: number;

  @Column("int", { name: "idOrden", nullable: true })
  @Field(() => Int, { nullable: true })
  idOrden: number | null;

  @Column("int", { name: "idOrdenEntrada", nullable: true })
  @Field(() => Int, { nullable: true })
  idOrdenEntrada: number | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @OneToMany(
    () => DetalleMovimientoInventario,
    (detalleMov) => detalleMov.movimientoInventario
  )
  @Field(() => [DetalleMovimientoInventario])
  detalleMovimientoInventarios: DetalleMovimientoInventario[];

  @ManyToOne(
    () => TipoMovimientoInventario,
    (tipoMov) => tipoMov.movimientoInventarios
  )
  @JoinColumn([
    { name: "idTipoMovimiento", referencedColumnName: "idTipoMovimiento" },
  ])
  @Field(() => TipoMovimientoInventario)
  tipoMovimiento: TipoMovimientoInventario;

  @ManyToOne(
    () => Ordenes,
    (ordenes) => ordenes.movimientoInventario
  )
  @JoinColumn([
    { name: "idOrden", referencedColumnName: "idOrden" },
  ])
  @Field(() => Ordenes, { nullable: true })
  orden: Ordenes;
}