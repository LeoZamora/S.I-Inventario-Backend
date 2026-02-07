import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoConexion } from "./catalogComputo/TipoConexion.entity";
import { Producto } from "./Producto.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("IX_AccesoriosPerifericos_TipoConexion", ["idTipoConexion"], {})
@Index("PK_AccesoriosPerifericos", ["idPeriferico"], { unique: true })
@Entity("AccesoriosPerifericos", { schema: "dbo" })
@ObjectType()
export class AccesoriosPerifericos {
  @PrimaryGeneratedColumn({ type: "int", name: "idPeriferico" })
  @Field(type => Int)
  idPeriferico: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("int", { name: "idTipoConexion" })
  @Field(type => Int)
  idTipoConexion: number;

  @Column("int", { name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @ManyToOne(
    () => TipoConexion,
    (tipoConexion) => tipoConexion.accesoriosPerifericos
  )
  @JoinColumn([
    { name: "idTipoConexion", referencedColumnName: "idTipoConexion" },
  ])
  @Field(type => TipoConexion)
  tipoConexion: TipoConexion;

  @ManyToOne(() => Producto, (producto) => producto.accesoriosPerifericos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;
}
