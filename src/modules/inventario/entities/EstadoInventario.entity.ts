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
import { Inventario } from "./Inventario.entity";

@Index("IX_EstadoInventario_Estados", ["idEstado"], {})
@Index("IX_EstadoInventario_Inventario", ["idInventario"], {})
@Index("PK_EstadoInventario", ["idEstadoInventario"], { unique: true })
@Entity("EstadoInventario", { schema: "dbo" })
@ObjectType()
export class EstadoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoInventario" })
  @Field(() => Int)
  idEstadoInventario: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaAsignacion", default: () => "getdate()" })
  @Field()
  fechaAsignacion: Date;

  @Column("int", { name: "idEstado" })
  @Field(() => Int)
  idEstado: number;

  @Column("int", { name: "idInventario" })
  @Field(() => Int)
  idInventario: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoInventarios)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  @Field(() => Estados)
  estados: Estados;

  @ManyToOne(() => Inventario, (inventario) => inventario.estadoInventarios)
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  @Field(() => Inventario)
  inventario: Inventario;
}