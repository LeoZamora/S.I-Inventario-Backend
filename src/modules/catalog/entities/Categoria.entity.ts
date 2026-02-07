import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubCategoria } from "./SubCategoria.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("PK_Categoria", ["idCategoria"], { unique: true })
@Entity("Categoria", { schema: "dbo" })
@ObjectType()
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoria" })
  @Field(type => Int)
  idCategoria: number;

  @Column("varchar", { name: "nombreCategoria", length: 100 })
  @Field()
  nombreCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("nvarchar", { name: "codigoSubCategoria", length: 50 })
  @Field()
  codigoSubCategoria: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @OneToMany(() => SubCategoria, (subCategoria) => subCategoria.categoria)
  @Field(type => [SubCategoria])
  subCategorias: SubCategoria[];
}
