import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Bodegas } from "../../inventario/entities/Bodegas.entity";
import { EstadosSolicitud } from './EstadoSolicitud.entity';
import { OrdenesEntrada } from "src/modules/ordenes/entities/OrdenesEntrada.entity";
import { Ordenes } from "src/modules/ordenes/entities/Ordenes.entity";
import { DetalleSolicitud } from "./DetalleSolicitud.entity";
import { TipoSolicitud } from "./TipoSolicitud.entity";


@Entity('SolicitudesTraslado', { schema: 'dbo' })
export class SolicitudesTraslado {
    @PrimaryGeneratedColumn({ name: 'idSolicitud', type: 'int' })
    idSolicitud: number

    @Column('nvarchar', { name: 'codigoSolicitud', unique: true, length: 50})
    codigoSolicitud: string

    @Column('varchar', { name: 'solicitante', length: 100 })
    solicitante: string

    @Column("text", { name: "observaciones", nullable: true })
    observaciones: string | null;

    @Column("varchar", { name: "motivo"})
    motivo: string;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    usuarioRegistro: string;

    @Column("int", { name: "idBodegaSolicitante" })
    idBodegaSolicitante: number;

    @Column("int", { name: "idBodegaSolicitada" })
    idBodegaSolicitada: number;

    @Column("int", { name: "idTipoSolicitud" })
    idTipoSolicitud: number;

    @ManyToOne(() => Bodegas, (b) => b.solicitudesComoSolicitante)
    @JoinColumn({ name: "idBodegaSolicitante", referencedColumnName: "idBodega" })
    bodegaSolicitante: Bodegas;

    @ManyToOne(() => Bodegas, (b) => b.solicitudesComoSolicitada)
    @JoinColumn({ name: "idBodegaSolicitada", referencedColumnName: "idBodega" })
    bodegaSolicitada: Bodegas;

    @ManyToOne(() => TipoSolicitud, (b) => b.solicitudesTraslado)
    @JoinColumn({ name: "idTipoSolicitud", referencedColumnName: "idTipoSolicitud" })
    tipoSolicitud: TipoSolicitud;

    @OneToMany(
        () => EstadosSolicitud,
        (estadoSolicitud) => estadoSolicitud.solicitud
    )
    estadoSolicitud: EstadosSolicitud[];

    @OneToMany(
        () => OrdenesEntrada,
        (ordenesEntrada) => ordenesEntrada.solicitud
    )
    ordenesEntrada: OrdenesEntrada[]

    @OneToMany(
        () => Ordenes,
        (orden) => orden.solicitudes
    )
    orden: Ordenes[]

    @OneToMany(
        () => DetalleSolicitud,
        (detalleSolicitud) => detalleSolicitud.solicitud,
    )
    detalleSolicitud: DetalleSolicitud[]
}