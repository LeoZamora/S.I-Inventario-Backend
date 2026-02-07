import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccesoriosPerifericos } from "../AccesoriosPerifericos.entity";
import { Impresoras } from "../Impresoras.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoConexion", ["idTipoConexion"], { unique: true })
@Entity("TipoConexion", { schema: "dbo" })
@ObjectType()
export class TipoConexion {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoConexion" })
  @Field(type => Int)
  idTipoConexion: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 50 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(
    () => AccesoriosPerifericos,
    (accesoriosPerifericos) => accesoriosPerifericos.tipoConexion
  )
  @Field(type => [AccesoriosPerifericos])
  accesoriosPerifericos: AccesoriosPerifericos[];

  @OneToMany(() => Impresoras, (impresoras) => impresoras.tipoConexion)
  @Field(type => [Impresoras])
  impresoras: Impresoras[];
}
