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
import { EstadoInventario } from "./EstadoInventario.entity";
import { Departamento } from "../../departamento/entities/Departamento.entity";
import { Bodegas } from "./Bodegas.entity";
import { InventarioCategoriasPermitidas } from "./InventarioCategoriasPermitidas.entity";
import { InventarioProducto } from "./InventarioProducto.entity";

@Index("PK_Inventario", ["idInventario"], { unique: true })
@Index("UQ_CodigoInventario", ["codigoInventario"], { unique: true })
@Entity("Inventario", { schema: "dbo" })
@ObjectType()
export class Inventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idInventario" })
  @Field(() => Int)
  idInventario: number;

  @Column("nvarchar", { name: "codigoInventario", unique: true, length: 50 })
  @Field()
  codigoInventario: string;

  @Column("varchar", { name: "nombreInventario", length: 100 })
  @Field()
  nombreInventario: string;

  @Column("bit", { name: "estado", default: () => "(1)" })
  @Field(() => Int)
  estado: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 500 })
  @Field()
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("int", { name: 'idBodega', nullable: true})
  @Field(() => Int, { nullable: true })
  idBodega: number;

  @Column("int", { name: 'idDepartamento', nullable: true})
  @Field(() => Int, { nullable: true })
  idDepartamento: number;

  @OneToMany(
    () => EstadoInventario,
    (estadoInventario) => estadoInventario.inventario
  )
  @Field(() => [EstadoInventario])
  estadoInventarios: EstadoInventario[];

  @ManyToOne(() => Departamento, (departamento) => departamento.inventarios)
  @JoinColumn([
    { name: "idDepartamento", referencedColumnName: "idDepartamento" },
  ])
  @Field(() => Departamento, { nullable: true })
  departamento: Departamento;

  @ManyToOne(() => Bodegas, (bodegas) => bodegas.inventarios)
  @JoinColumn([{ name: "idBodega", referencedColumnName: "idBodega" }])
  @Field(() => Bodegas, { nullable: true })
  bodegas: Bodegas;

  @OneToMany(
    () => InventarioCategoriasPermitidas,
    (invCat) => invCat.inventario
  )
  @Field(() => [InventarioCategoriasPermitidas])
  inventarioCategoriasPermitidas: InventarioCategoriasPermitidas[];

  @OneToMany(
    () => InventarioProducto,
    (inventarioProducto) => inventarioProducto.inventario
  )
  @Field(() => [InventarioProducto])
  inventarioProductos: InventarioProducto[];
}