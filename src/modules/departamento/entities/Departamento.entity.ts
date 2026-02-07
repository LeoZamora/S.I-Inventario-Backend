import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EstadoDepartamento } from "./EstadoDepartamento.entity";
import { Inventario } from "../../inventario/entities/Inventario.entity";

@Index("PK_Departamento", ["idDepartamento"], { unique: true })
@Index("UQ_codigoDepartamento", ["codigoDepartamento"], { unique: true })
@Entity("Departamento", { schema: "dbo" })
@ObjectType()
export class Departamento {
  @PrimaryGeneratedColumn({ type: "int", name: "idDepartamento" })
  @Field(() => Int)
  idDepartamento: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("nvarchar", { name: "codigoDepartamento", unique: true, length: 50 })
  @Field()
  codigoDepartamento: string;

  @Column("varchar", { name: "nombreDepartamento", length: 100 })
  @Field()
  nombreDepartamento: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @OneToMany(
    () => EstadoDepartamento,
    (estadoDepartamento) => estadoDepartamento.departamento
  )
  @Field(() => [EstadoDepartamento])
  estadoDepartamentos: EstadoDepartamento[];

  @OneToMany(() => Inventario, (inventario) => inventario.departamento)
  @Field(() => [Inventario])
  inventarios: Inventario[];
}