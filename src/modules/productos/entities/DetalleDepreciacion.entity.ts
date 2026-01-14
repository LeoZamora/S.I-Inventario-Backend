import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";

@Entity("DetalleDepreciacion", { schema: 'dbo' })
export class DetalleDepreciacion {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idDetalleDepreciacion' })
    idDetalleDepreciacion: number

    @Column({ name: 'aniosDepreciacion', type: 'int' })
    aniosDepreciacion: number

    @Column({ name: 'costoActivo', type: "decimal" })
    costoActivo: number

    @Column({ name: 'depreciacionAnual', type: "decimal" })
    depreciacionAnual: number

    @Column({ name: 'depreciacionMen', type: "decimal" })
    depreciacionMen: number

    @Column({ name: 'valorLibro', type: "decimal" })
    valorLibro: number

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @Column("int", { name: "idProducto" })
    idProducto: number;

    @ManyToOne(() => Producto, (producto) => producto.detalleDepreciacion, {})
    @JoinColumn({
        name: 'idProducto',
        referencedColumnName: 'idProducto',
    })
    producto: Producto;
}




