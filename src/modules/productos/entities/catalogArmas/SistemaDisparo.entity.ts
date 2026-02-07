import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_SistemaDisparo", ["idSistemaDisparo"], { unique: true })
@Entity("SistemaDisparo", { schema: "dbo" })
@ObjectType()
export class SistemaDisparo {
  @PrimaryGeneratedColumn({ type: "int", name: "idSistemaDisparo" })
  @Field(type => Int)
  idSistemaDisparo: number;

  @Column("varchar", { name: "nombreSistema", length: 100 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idSistemaDisparo2)
  @Field(type => [ArmasFuego])
  armasFuegos: ArmasFuego[];
}
