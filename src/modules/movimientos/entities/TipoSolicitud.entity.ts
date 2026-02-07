import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudesTraslado } from "./SolicitudesTraslado.entity";

@Index("PK_TipoSolicitud", ["idTipoSolicitud"], { unique: true })
@Entity("TipoSolicitud", { schema: "dbo" })
export class TipoSolicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "idTipoSolicitud" })
    idTipoSolicitud: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
    descripcion: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @OneToMany(
        () => SolicitudesTraslado,
        (solicitud) => solicitud.tipoSolicitud
    )
    solicitudesTraslado: SolicitudesTraslado[];
}
