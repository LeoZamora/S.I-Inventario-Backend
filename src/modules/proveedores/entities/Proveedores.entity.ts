import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProveedorProducto } from 'src/modules/productos/entities/ProveedorProducto.entity';
import { DetalleEntrada } from 'src/modules/ordenes/entities/DetalleCompra.entity';

@Index("UQ_codigoProveedor", ["codigoProveedor"], { unique: true })
@Index("PK_Proveedores", ["idProveedor"], { unique: true })
@Index("UQ_ruc", ["ruc"], { unique: true })
@Entity('Proveedores', { schema: 'dbo' })
export class Proveedores {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idProveedor' })
    idProveedor: number;

    @Column("nvarchar", { name: 'codigoProveedor', unique: true, length: 50})
    codigoProveedor: number;

    @Column("varchar", { name: 'nombreProveedor'})
    nombreProveedor: string;

    @Column("varchar", { name: 'nombreComercial', nullable: true})
    nombreComercial: string | null;

    @Column("nvarchar", { name: 'ruc', unique: true, nullable: true })
    ruc: string | null;

    @Column("nvarchar", { name: 'direccion'})
    direccion: string;

    @Column("nvarchar", { name: 'telefono'})
    telefono: string;

    @Column("nvarchar", { name: 'correo', length: 100, nullable: true})
    correo: string | null;

    @Column("bit", { name: 'estado', default: () => "(1)"})
    estado: boolean;

    @Column("varchar", { name: 'observaciones', nullable: true})
    observaciones: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    usuarioRegistro: string;

    @OneToMany(
        () => ProveedorProducto,
        (producto) => producto.proveedor
    )
    proveedor: ProveedorProducto[];

    @OneToMany(
        () => DetalleEntrada,
        (producto) => producto.proveedor
    )
    detalleEntrada: DetalleEntrada[];
}
