import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoArma", ["idTipoArma"], { unique: true })
@Entity("TipoArma", { schema: "dbo" })
@ObjectType()
export class TipoArma {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoArma" })
  @Field(type => Int)
  idTipoArma: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idTipoArma2)
  @Field(type => [ArmasFuego])
  armasFuegos: ArmasFuego[];
}
