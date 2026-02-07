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
import { CategoriaImpresora } from "./catalogComputo/CategoriaImpresora.entity";
import { TipoImpresora } from "./catalogComputo/TipoImpresora.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("IX_Impresoras_CategoriaImpresora", ["idCategoriaImpresora"], {})
@Index("IX_Impresoras_TipoConexion", ["idTipoConexion"], {})
@Index("IX_Impresoras_TipoImpresion", ["idTipoImpresion"], {})
@Index("PK_Impresoras", ["idImpresora"], { unique: true })
@Entity("Impresoras", { schema: "dbo" })
@ObjectType()
export class Impresoras {
  @PrimaryGeneratedColumn({ type: "int", name: "idImpresora" })
  @Field(type => Int)
  idImpresora: number;

  @Column("varchar", { name: "color", nullable: true, length: 50 })
  @Field(type => String, { nullable: true } )
  color: string | null;

  @Column("varchar", { name: "noSerie", length: 50 })
  @Field()
  noSerie: string;

  @Column("int", { name: "idTipoImpresion" })
  @Field(type => Int)
  idTipoImpresion: number;

  @Column("int", { name: "idCategoriaImpresora" })
  @Field(type => Int)
  idCategoriaImpresora: number;

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

  @ManyToOne(() => TipoConexion, (tipoConexion) => tipoConexion.impresoras)
  @JoinColumn([
    { name: "idTipoConexion", referencedColumnName: "idTipoConexion" },
  ])
  @Field(type => TipoConexion)
  tipoConexion: TipoConexion;

  @ManyToOne(() => Producto, (producto) => producto.impresoras)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;

  @ManyToOne(
    () => CategoriaImpresora,
    (categoriaImpresora) => categoriaImpresora.impresoras
  )
  @JoinColumn([
    {
      name: "idCategoriaImpresora",
      referencedColumnName: "idCategoriaImpresora",
    },
  ])
  @Field(type => CategoriaImpresora)
  categoriaImpresora: CategoriaImpresora;

  @ManyToOne(() => TipoImpresora, (tipoImpresora) => tipoImpresora.impresoras)
  @JoinColumn([
    { name: "idTipoImpresion", referencedColumnName: "idTipoImpresion" },
  ])
  @Field(type => TipoImpresora)
  tipoImpresion: TipoImpresora;
}
