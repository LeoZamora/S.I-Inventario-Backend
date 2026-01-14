import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { OrdenesEntrada } from "./OrdenesEntrada.entity";
import { Producto } from "src/modules/productos/entities/Producto.entity";
import { Proveedores } from "src/modules/proveedores/entities/Proveedores.entity";

@Index("PK_DetalleEntrada", ["idDetalleEntrada"], { unique: true })
@Entity('DetalleEntrada', { schema: 'dba' })
export class DetalleEntrada {
    @PrimaryGeneratedColumn({ type: "int", name: "idDetalleEntrada" })
    idDetalleEntrada: number

    @Column("varchar", { name: "observaciones", nullable: true })
    observaciones: string | null;

    @Column("int", { name: "cantidad", default: () => "(1)" })
    cantidad: number;

    @Column("int", { name: 'idProducto' })
    idProducto: number

    @Column("int", { name: 'idOrdenEntrada' })
    idOrdenEntrada: number

    @Column("int", { name: 'idProveedor' })
    idProveedor: number

    @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
    @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
    producto: Producto;

    @ManyToOne(() => OrdenesEntrada, (producto) => producto.detalleEntrada)
    @JoinColumn([{ name: "idOrdenEntrada", referencedColumnName: "idOrdenEntrada" }])
    ordenesEntrada: OrdenesEntrada;

    @ManyToOne(() => Proveedores, (producto) => producto.proveedor)
    @JoinColumn([{ name: "idProveedor", referencedColumnName: "idProveedor" }])
    proveedor: OrdenesEntrada;
}