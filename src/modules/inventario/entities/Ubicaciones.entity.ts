import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Bodegas } from "./Bodegas.entity";

@Index("PK_Ubicacion", ["idUbicacion"], { unique: true })
@Index("UQ_codigoUbicacion", ["codigoUbicacion"], { unique: true })
@Entity("Ubicaciones", { schema: "dbo" })
@ObjectType()
export class Ubicaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "idUbicacion" })
  @Field(() => Int)
  idUbicacion: number;

  @Column("nvarchar", { name: "codigoUbicacion", unique: true, length: 50 })
  @Field()
  codigoUbicacion: string;

  @Column("varchar", { name: "nombreUbicacion", length: 300 })
  @Field()
  nombreUbicacion: string;

  @Column("varchar", { name: "direccion", nullable: true })
  @Field(type => String, { nullable: true })
  direccion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @OneToMany(() => Bodegas, (bodegas) => bodegas.ubicacion)
  @Field(() => [Bodegas])
  bodegas: Bodegas[];
}