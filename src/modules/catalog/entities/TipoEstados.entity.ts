import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("UQ_codigoTipoEstado", ["codigoTipoEstado"], { unique: true })
@Index("PK_TipoEstados", ["idTipoEstado"], { unique: true })
@Entity("TipoEstados", { schema: "dbo" })
@ObjectType()
export class TipoEstados {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoEstado" })
  @Field(type => Int)
  idTipoEstado: number;

  @Column("nvarchar", { name: "codigoTipoEstado", length: 50 })
  @Field()
  codigoTipoEstado: string;

  @Column("varchar", { name: "nombreTipoEstado", length: 50 })
  @Field()
  nombreTipoEstado: string;

  @Column("varchar", { name: "descripcion", length: 300, nullable: true })
  @Field(type => String, { nullable: true })
  descripcion: string;

  @Column("nvarchar", { name: "codigoEstados", length: 50 })
  @Field()
  codigoEstados: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => Estados, (estados) => estados.tipoEstados)
  @Field(type => [Estados])
  estados: Estados[];
}
