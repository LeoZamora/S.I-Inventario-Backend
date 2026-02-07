import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("PK_Mobiliario", ["idMobiliario"], { unique: true })
@Entity("Mobiliario", { schema: "dbo" })
@ObjectType()
export class Mobiliario {
  @PrimaryGeneratedColumn({ type: "int", name: "idMobiliario" })
  @Field(type => Int)
  idMobiliario: number;

  @Column("varchar", { name: "color", length: 50 })
  @Field()
  color: string;

  @Column("varchar", { name: "usoDestinado" })
  @Field()
  usoDestinado: string;

  @Column("varchar", { name: "acabado", nullable: true })
  @Field(type => String, { nullable: true })
  acabado: string | null;

  @Column("varchar", { name: "material" })
  @Field()
  material: string;

  @Column("varchar", { name: "dimensiones" })
  @Field()
  dimensiones: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @ManyToOne(() => Producto, (producto) => producto.mobiliarios)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;
}
