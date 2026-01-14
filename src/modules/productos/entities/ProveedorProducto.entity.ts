import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedores } from "src/modules/proveedores/entities/Proveedores.entity";
import { Producto } from "./Producto.entity";

@Entity('ProveedorProducto', { schema: 'dbo' })
export class ProveedorProducto {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idDetProvProd' })
    idDetProvProd: number

    @Column('varchar', { name: "observaciones", length: 300, nullable: true})
    observaciones: string | null

    @Column('varchar', { name: "fechaRegistro"})
    fechaRegistro: Date

    @Column('varchar', { name: "usuarioRegistro", length: 50})
    usuarioRegistro: string

    @Column("int", { name: "idProducto" })
    idProducto: number;

    @Column("int", { name: "idProducto" })
    idProveedor: number;

    @ManyToOne(() => Producto, (prod) => prod.proveedores)
    @JoinColumn([{
        name: 'idProducto',
        referencedColumnName: 'idProducto'
    }])
    producto: Producto

    @ManyToOne(() => Proveedores, (prod) => prod.proveedor)
    @JoinColumn([{
        name: 'idProveedor',
        referencedColumnName: 'idProveedor'
    }])
    proveedor: Proveedores
}