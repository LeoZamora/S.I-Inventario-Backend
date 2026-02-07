import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { InventarioCategoriasPermitidas } from "src/modules/inventario/entities/InventarioCategoriasPermitidas.entity";
import { Producto } from "src/modules/productos/entities/Producto.entity";
import { Categoria } from "./Categoria.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("IX_SubCategoria_Categoria", ["idCategoria"], {})
@Index("PK_SubCategoria", ["idSubCategoria"], { unique: true })
@Index("UQ_codigoSubCategoria", ["codigoSubCategoria"], { unique: true })
@Entity("SubCategoria", { schema: "dbo" })
@ObjectType()
export class SubCategoria {
  @PrimaryGeneratedColumn({ type: "int", name: "idSubCategoria" })
  @Field(type => Int)
  idSubCategoria: number;

  @Column("varchar", { name: "nombre", length: 100 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "codigoSubCategoria", length: 50 })
  @Field()
  codigoSubCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idCategoria" })
  @Field(type => Int)
  idCategoria: number;

  @OneToMany(
    () => InventarioCategoriasPermitidas,
    (inventarioCategoriasPermitidas) =>
      inventarioCategoriasPermitidas.subCategoria
  )
  @Field(type => [InventarioCategoriasPermitidas])
  inventarioCategoriasPermitidas: InventarioCategoriasPermitidas[];

  @OneToMany(() => Producto, (producto) => producto.subCategoria)
  @Field(type => [Producto])
  productos: Producto[];

  @ManyToOne(() => Categoria, (categoria) => categoria.subCategorias)
  @JoinColumn([{ name: "idCategoria", referencedColumnName: "idCategoria" }])
  @Field(type => Categoria)
  categoria: Categoria;
}
