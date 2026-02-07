import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { TipoCalibre } from "./catalogArmas/TipoCalibre.entity";
import { TipoArma } from "./catalogArmas/TipoArma.entity";
import { SistemaDisparo } from "./catalogArmas/SistemaDisparo.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@Index("IX_ArmasFuego_SistemaDisparo", ["idSistemaDisparo"], {})
@Index("IX_ArmasFuego_TipoArma", ["idTipoArma"], {})
@Index("IX_ArmasFuego_TipoCalibre", ["idCalibre"], {})
@Index("PK_ArmasFuego", ["idArma"], { unique: true })
@Entity("ArmasFuego", { schema: "dbo" })
@ObjectType()
export class ArmasFuego {
  @PrimaryGeneratedColumn({ type: "int", name: "idArma" })
  @Field(type => Int)
  idArma: number;

  @Column("varchar", { name: "numSerie", length: 50 })
  @Field()
  numSerie: string;

  @Column("int", { name: "capacidadCargador", default: () => "(1)" })
  @Field(type => Int)
  capacidadCargador: number;

  @Column("decimal", {
    name: "longitudCanon",
    nullable: true,
    precision: 18,
    scale: 4,
  })
  @Field(type => Float, { nullable: true })
  longitudCanon: number | null;

  @Column("bit", { name: "licencia", default: () => "(1)" })
  @Field(type => Boolean)
  licencia: boolean;

  @Column("varchar", { name: "material", length: 50 })
  @Field()
  material: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("int", { name: "idCalibre" })
  @Field(type => Int)
  idCalibre: number;

  @Column("int", { name: "idTipoArma" })
  @Field(type => Int)
  idTipoArma: number;

  @Column("int", { name: "idSistemaDisparo" })
  @Field(type => Int)
  idSistemaDisparo: number;

  @Column("int", { name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @ManyToOne(() => Producto, (producto) => producto.armasFuegos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;

  @ManyToOne(() => TipoCalibre, (tipoCalibre) => tipoCalibre.armasFuegos)
  @JoinColumn([{ name: "idCalibre", referencedColumnName: "idCalibre" }])
  @Field(type =>TipoCalibre)
  idCalibre2: TipoCalibre;

  @ManyToOne(() => TipoArma, (tipoArma) => tipoArma.armasFuegos)
  @JoinColumn([{ name: "idTipoArma", referencedColumnName: "idTipoArma" }])
  @Field(type => TipoArma)
  idTipoArma2: TipoArma;

  @ManyToOne(
    () => SistemaDisparo,
    (sistemaDisparo) => sistemaDisparo.armasFuegos
  )
  @JoinColumn([
    { name: "idSistemaDisparo", referencedColumnName: "idSistemaDisparo" },
  ])
  @Field(type => SistemaDisparo)
  idSistemaDisparo2: SistemaDisparo;
}
