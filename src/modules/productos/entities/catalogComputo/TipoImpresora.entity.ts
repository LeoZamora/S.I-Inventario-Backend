import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Impresoras } from "../Impresoras.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoImpresion", ["idTipoImpresion"], { unique: true })
@Entity("TipoImpresora", { schema: "dbo" })
@ObjectType()
export class TipoImpresora {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoImpresion" })
  @Field(type => Int)
  idTipoImpresion: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => Impresoras, (impresoras) => impresoras.tipoImpresion)
  @Field(type => [Impresoras])
  impresoras: Impresoras[];
}
