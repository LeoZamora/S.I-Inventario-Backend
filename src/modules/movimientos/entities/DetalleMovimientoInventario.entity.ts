import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { Producto } from "../../productos/entities/Producto.entity";

@Index("IX_DetalleMovimientoInventario_Movimiento", ["idMovInv"], {})
@Index("IX_DetalleMovimientoInventario_Producto", ["idProducto"], {})
@Index("PK_DetalleMovimientoInventario", ["idDetalleMovInv"], { unique: true })
@Entity("DetalleMovimientoInventario", { schema: "dbo" })
@ObjectType()
export class DetalleMovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idDetalleMovInv" })
  @Field(() => Int)
  idDetalleMovInv: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("int", { name: "cantidad", default: () => "(1)" })
  @Field(() => Int)
  cantidad: number;

  @Column("int", { name: "idProducto" })
  @Field(() => Int)
  idProducto: number;

  @Column("int", { name: "idMovInv" })
  @Field(() => Int)
  idMovInv: number;

  @Column("decimal", {
    name: "precioUnitario",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  precioUnitario: number;

  @ManyToOne(
    () => MovimientoInventario,
    (movimientoInventario) => movimientoInventario.detalleMovimientoInventarios,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "idMovInv", referencedColumnName: "idMovInv" }])
  @Field(() => MovimientoInventario)
  movimientoInventario: MovimientoInventario;

  @ManyToOne(
    () => Producto,
    (producto) => producto.detalleMovimientoInventarios
  )
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(() => Producto)
  producto: Producto;
}