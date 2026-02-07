import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { Producto } from "./Producto.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("IX_EstadoProducto_Estados", ["idEstado"], {})
@Index("IX_EstadoProducto_Producto", ["idProducto"], {})
@Index("PK_EstadoProducto", ["idEstadoProducto"], { unique: true })
@Entity("EstadoProducto", { schema: "dbo" })
@ObjectType()
export class EstadoProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoProducto" })
  @Field(type => Int)
  idEstadoProducto: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @Column("int", { name: "idEstado" })
  @Field(type => Int)
  idEstado: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoProductos)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  @Field(type => Estados)
  estados: Estados;

  @ManyToOne(() => Producto, (producto) => producto.estadoProductos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;
}
