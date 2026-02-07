import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SolicitudesTraslado } from "./SolicitudesTraslado.entity";

@Index("PK_TipoSolicitud", ["idTipoSolicitud"], { unique: true })
@Entity("TipoSolicitud", { schema: "dbo" })
@ObjectType()
export class TipoSolicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "idTipoSolicitud" })
    @Field(() => Int)
    idTipoSolicitud: number;

    @Column("varchar", { name: "nombre", length: 50 })
    @Field()
    nombre: string;

    @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
    @Field(type => String, { nullable: true })
    descripcion: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field()
    fechaRegistro: Date;

    @OneToMany(
        () => SolicitudesTraslado,
        (solicitud) => solicitud.tipoSolicitud
    )
    @Field(() => [SolicitudesTraslado])
    solicitudesTraslado: SolicitudesTraslado[];
}