import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquiposComputo } from "../EquiposComputo.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoDispositivo", ["idTipoDispositivo"], { unique: true })
@Entity("TipoDispositivo", { schema: "dbo" })
@ObjectType()
export class TipoDispositivo {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoDispositivo" })
  @Field(type => Int)
  idTipoDispositivo: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.idTipoDispositivo2
  )
  @Field(type => [EquiposComputo])
  equiposComputos: EquiposComputo[];
}
