import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoCalibre", ["idCalibre"], { unique: true })
@Entity("TipoCalibre", { schema: "dbo" })
@ObjectType()
export class TipoCalibre {
  @PrimaryGeneratedColumn({ type: "int", name: "idCalibre" })
  @Field(type => Int)
  idCalibre: number;

  @Column("varchar", { name: "nombreCalibre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idCalibre2)
  @Field(type => [ArmasFuego])
  armasFuegos: ArmasFuego[];
}
