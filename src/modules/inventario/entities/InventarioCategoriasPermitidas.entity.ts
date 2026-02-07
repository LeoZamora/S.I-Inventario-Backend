import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SubCategoria } from "src/modules/catalog/entities/SubCategoria.entity";
import { Inventario } from "./Inventario.entity";

@Index("IX_InventarioCategoriasPermitidas_Inventario", ["idInventario"], {})
@Index("IX_InventarioCategoriasPermitidas_SubCategoria", ["idSubCategoria"], {})
@Index("PK_InventarioCategoriasPermitidas", ["idCategoriaPermitida"], {
  unique: true,
})
@Entity("InventarioCategoriasPermitidas", { schema: "dbo" })
@ObjectType()
export class InventarioCategoriasPermitidas {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoriaPermitida" })
  @Field(() => Int)
  idCategoriaPermitida: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("int", { name: "idInventario" })
  @Field(() => Int)
  idInventario: number;

  @Column("int", { name: "idSubCategoria" })
  @Field(() => Int)
  idSubCategoria: number;

  @ManyToOne(
    () => SubCategoria,
    (subCategoria) => subCategoria.inventarioCategoriasPermitidas
  )
  @JoinColumn([
    { name: "idSubCategoria", referencedColumnName: "idSubCategoria" },
  ])
  @Field(() => SubCategoria)
  subCategoria: SubCategoria;

  @ManyToOne(
    () => Inventario,
    (inventario) => inventario.inventarioCategoriasPermitidas
  )
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  @Field(() => Inventario)
  inventario: Inventario;
}