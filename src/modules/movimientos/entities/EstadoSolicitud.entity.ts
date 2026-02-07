import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SolicitudesTraslado } from "./SolicitudesTraslado.entity";
import { Estados } from "src/modules/catalog/entities/Estados.entity";

@Entity('EstadosSolicitud', { schema: 'dbo' })
@ObjectType()
export class EstadosSolicitud {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idEstadoSolicitud' })
    @Field(() => Int)
    idEstadoSolicitud: number

    @Column('varchar', { name: 'observaciones', nullable: true })
    @Field(type => String, { nullable: true })
    observaciones: string | null

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field()
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    @Field()
    usuarioRegistro: string;

    @Column("int", { name: "idSolicitud" })
    @Field(() => Int)
    idSolicitud: number;

    @Column("int", { name: "idEstado" })
    @Field(() => Int)
    idEstado: number;

    @ManyToOne(() => Estados, (estados) => estados.estadosSolicitud)
    @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
    @Field(() => Estados)
    estados: Estados;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.estadoSolicitud)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    @Field(() => SolicitudesTraslado)
    solicitud: SolicitudesTraslado;
}
