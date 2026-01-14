import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudesTraslado } from "./SolicitudesTraslado.entity";
import { Estados } from "src/modules/catalog/entities/Estados.entity";

@Entity('EstadosSolicitud', { schema: 'dbo' })
export class EstadosSolicitud {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idEstadoSolicitud' })
    idEstadoSolicitud: number

    @Column('varchar', { name: 'observaciones', nullable: true })
    observaciones: string | null

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    usuarioRegistro: string;

    @Column("int", { name: "idSolicitud" })
    idSolicitud: number;

    @Column("int", { name: "idEstado" })
    idEstado: number;

    @ManyToOne(() => Estados, (estados) => estados.estadosSolicitud)
    @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
    estados: Estados;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.estadoSolicitud)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    solicitud: SolicitudesTraslado;
}

