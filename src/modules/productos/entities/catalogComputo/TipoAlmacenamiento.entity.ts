import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquiposComputo } from "../EquiposComputo.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Index("PK_TipoAlmacenamiento", ["idTipoAlmacenamiento"], { unique: true })
@Entity("TipoAlmacenamiento", { schema: "dbo" })
@ObjectType()
export class TipoAlmacenamiento {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoAlmacenamiento" })
  @Field(type => Int)
  idTipoAlmacenamiento: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.tipoAlmacenamiento
  )
  @Field(type => [EquiposComputo])
  equiposComputos: EquiposComputo[];
}
