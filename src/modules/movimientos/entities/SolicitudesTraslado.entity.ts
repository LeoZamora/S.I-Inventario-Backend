import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Bodegas } from "../../inventario/entities/Bodegas.entity";
import { EstadosSolicitud } from './EstadoSolicitud.entity';
import { OrdenesEntrada } from "src/modules/ordenes/entities/OrdenesEntrada.entity";
import { Ordenes } from "src/modules/ordenes/entities/Ordenes.entity";
import { DetalleSolicitud } from "./DetalleSolicitud.entity";
import { TipoSolicitud } from "./TipoSolicitud.entity";

@Entity('SolicitudesTraslado', { schema: 'dbo' })
@ObjectType()
export class SolicitudesTraslado {
    @PrimaryGeneratedColumn({ name: 'idSolicitud', type: 'int' })
    @Field(() => Int)
    idSolicitud: number

    @Column('nvarchar', { name: 'codigoSolicitud', unique: true, length: 50})
    @Field()
    codigoSolicitud: string

    @Column('varchar', { name: 'solicitante', length: 100 })
    @Field()
    solicitante: string

    @Column("text", { name: "observaciones", nullable: true })
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @Column("varchar", { name: "motivo"})
    @Field()
    motivo: string;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field()
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    @Field()
    usuarioRegistro: string;

    @Column("int", { name: "idBodegaSolicitante" })
    @Field(() => Int)
    idBodegaSolicitante: number;

    @Column("int", { name: "idBodegaSolicitada" })
    @Field(() => Int)
    idBodegaSolicitada: number;

    @Column("int", { name: "idTipoSolicitud" })
    @Field(() => Int)
    idTipoSolicitud: number;

    @ManyToOne(() => Bodegas, (b) => b.solicitudesComoSolicitante)
    @JoinColumn({ name: "idBodegaSolicitante", referencedColumnName: "idBodega" })
    @Field(() => Bodegas)
    bodegaSolicitante: Bodegas;

    @ManyToOne(() => Bodegas, (b) => b.solicitudesComoSolicitada)
    @JoinColumn({ name: "idBodegaSolicitada", referencedColumnName: "idBodega" })
    @Field(() => Bodegas)
    bodegaSolicitada: Bodegas;

    @ManyToOne(() => TipoSolicitud, (b) => b.solicitudesTraslado)
    @JoinColumn({ name: "idTipoSolicitud", referencedColumnName: "idTipoSolicitud" })
    @Field(() => TipoSolicitud)
    tipoSolicitud: TipoSolicitud;

    @OneToMany(
        () => EstadosSolicitud,
        (estadoSolicitud) => estadoSolicitud.solicitud
    )
    @Field(() => [EstadosSolicitud])
    estadoSolicitud: EstadosSolicitud[];

    @OneToMany(
        () => OrdenesEntrada,
        (ordenesEntrada) => ordenesEntrada.solicitud
    )
    @Field(() => [OrdenesEntrada])
    ordenesEntrada: OrdenesEntrada[]

    @OneToMany(
        () => Ordenes,
        (orden) => orden.solicitudes
    )
    @Field(() => [Ordenes])
    orden: Ordenes[]

    @OneToMany(
        () => DetalleSolicitud,
        (detalleSolicitud) => detalleSolicitud.solicitud,
    )
    @Field(() => [DetalleSolicitud])
    detalleSolicitud: DetalleSolicitud[]
}