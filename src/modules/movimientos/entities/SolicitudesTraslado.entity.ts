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
import { OrdenesSalida } from "src/modules/ordenes/entities/OrdenesSalida.entity";

@Index('UQ_-')
@Entity('SolicitudesTraslado', { schema: 'dbo' })
export class SolicitudesTraslado {
    @PrimaryGeneratedColumn({ name: 'idSolicitud', type: 'int' })
    idSolicitud: number

    @Column('nvarchar', { name: 'codigoSolicitud', unique: true, length: 50})
    codigoSolicitud: string

    @Column("varchar", { name: "observaciones", nullable: true})
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

    @ManyToOne(
        () => Bodegas,
        (bodega) => bodega.solicitudes
    )
    @JoinColumn([
        { name: "idBodega", referencedColumnName: "idBodega" },
    ])
    bodega: Bodegas;

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
        () => OrdenesSalida,
        (ordenesSalida) => ordenesSalida.solicitudes
    )
    ordenesSalida: OrdenesSalida[]
}