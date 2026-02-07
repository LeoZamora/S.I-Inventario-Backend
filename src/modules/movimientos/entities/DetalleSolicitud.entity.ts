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
import { Producto } from "src/modules/productos/entities/Producto.entity";

@Index("PK_DetalleSolicitud", ["idDetalleSolicitud"], { unique: true })
@Entity('DetalleSolicitud', { schema: 'dbo' })
export class DetalleSolicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "idDetalleSolicitud" })
    idDetalleSolicitud: number

    @Column("varchar", { name: "observaciones", nullable: true })
    observaciones: string | null;

    @Column("int", { name: "cantidad", default: () => "(1)" })
    cantidad: number;

    @Column("decimal", {
        name: "precioUnitario",
        precision: 18,
        scale: 4,
        default: () => "(0)",
    })
    precioUnitario: number;

    @Column("int", { name: 'idProducto' })
    idProducto: number

    @Column("int", { name: 'idSolicitud' })
    idSolicitud: number

    @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
    @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
    producto: Producto;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.detalleSolicitud)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    solicitud: SolicitudesTraslado;

}