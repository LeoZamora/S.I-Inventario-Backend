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
import { Producto } from "../../productos/entities/Producto.entity";
import { Ordenes } from "./Ordenes.entity";

@Index("PK_DetalleOrden", ["idDetalleSalida"], { unique: true })
@Entity("DetalleSalida", { schema: "dbo" })
@ObjectType()
export class DetalleSalida {
  @PrimaryGeneratedColumn({ type: "int", name: "idDetalleSalida" })
  @Field(() => Int)
  idDetalleSalida: number;

  @Column("int", { name: "cantidad", default: () => "(1)" })
  @Field(() => Int)
  cantidad: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("decimal", {
    name: "precioUnitario",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  @Field(() => Float)
  precioUnitario: number;

  @Column("int", { name: 'idProducto' })
  @Field(() => Int)
  idProducto: number

  @Column("int", { name: 'idOrden' })
  @Field(() => Int)
  idOrden: number

  @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(() => Producto)
  producto: Producto;

  @ManyToOne(() => Ordenes, (ordenes) => ordenes.detalleOrdens)
  @JoinColumn([{ name: "idOrden", referencedColumnName: "idOrden" }])
  @Field(() => Ordenes)
  orden: Ordenes;
}