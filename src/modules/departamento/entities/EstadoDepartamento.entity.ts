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
import { Estados } from "../../catalog/entities/Estados.entity";
import { Departamento } from "./Departamento.entity";

@Index("IX_EstadoDepartamento_Departamento", ["idDepartamento"], {})
@Index("IX_EstadoDepartamento_Estados", ["idEstado"], {})
@Index("PK_EstadoDepartamento", ["idEstadoDepartamento"], { unique: true })
@Entity("EstadoDepartamento", { schema: "dbo" })
@ObjectType()
export class EstadoDepartamento {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoDepartamento" })
  @Field(() => Int)
  idEstadoDepartamento: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaAsignacion", default: () => "getdate()" })
  @Field()
  fechaAsignacion: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idEstado" })
  @Field(() => Int)
  idEstado: number;

  @Column("int", { name: "idDepartamento" })
  @Field(() => Int)
  idDepartamento: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoDepartamentos)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  @Field(() => Estados)
  estados: Estados;

  @ManyToOne(
    () => Departamento,
    (departamento) => departamento.estadoDepartamentos
  )
  @JoinColumn([
    { name: "idDepartamento", referencedColumnName: "idDepartamento" },
  ])
  @Field(() => Departamento)
  departamento: Departamento;
}