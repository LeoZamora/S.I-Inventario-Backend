import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Impresoras } from "../Impresoras.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_CategoriaImpresora", ["idCategoriaImpresora"], { unique: true })
@Entity("CategoriaImpresora", { schema: "dbo" })
@ObjectType()
export class CategoriaImpresora {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoriaImpresora" })
  @Field(type => Int)
  idCategoriaImpresora: number;

  @Column("varchar", { name: "nombreCategoria", length: 50 })
  @Field()
  nombreCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 50 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => Impresoras, (impresoras) => impresoras.categoriaImpresora)
  @Field(type => [Impresoras])
  impresoras: Impresoras[];
}
