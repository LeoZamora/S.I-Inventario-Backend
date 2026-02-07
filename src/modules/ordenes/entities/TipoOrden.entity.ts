import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ordenes } from "./Ordenes.entity";

@Index("PK_TipoSolicitud", ["idTipoOrden"], { unique: true })
@Entity("TipoOrden", { schema: "dbo" })
export class TipoOrdenes {
    @PrimaryGeneratedColumn({ type: "int", name: "idTipoOrden" })
    idTipoOrden: number;

    @Column("varchar", { name: "nombre", length: 50 })
    nombre: string;

    @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
    descripcion: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @OneToMany(
        () => Ordenes,
        (orden) => orden.tipoOrden
    )
    ordenes: Ordenes[];
}
