import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProveedorProducto } from 'src/modules/productos/entities/ProveedorProducto.entity';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("UQ_codigoProveedor", ["codigoProveedor"], { unique: true })
@Index("PK_Proveedores", ["idProveedor"], { unique: true })
@Index("UQ_ruc", ["ruc"], { unique: true })
@Entity('Proveedores', { schema: 'dbo' })
@ObjectType()
export class Proveedores {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idProveedor' })
    @Field(type => Int)
    idProveedor: number;

    @Column("nvarchar", { name: 'codigoProveedor', unique: true, length: 50})
    @Field(() => String)
    codigoProveedor: string;

    @Column("varchar", { name: 'nombreProveedor'})
    @Field()
    nombreProveedor: string;

    @Column("varchar", { name: 'nombreComercial', nullable: true})
    @Field(type =>  String, { nullable: true })
    nombreComercial: string | null;

    @Column("nvarchar", { name: 'ruc', unique: true, nullable: true })
    @Field(type => String, { nullable: true })
    ruc: string | null;

    @Column("nvarchar", { name: 'direccion'})
    @Field()
    direccion: string;

    @Column("nvarchar", { name: 'telefono'})
    @Field()
    telefono: string;

    @Column("nvarchar", { name: 'correo', length: 100, nullable: true})
    @Field(type => String, { nullable: true })
    correo: string | null;

    @Column("bit", { name: 'estado', default: () => "(1)"})
    @Field(type => Int)
    estado: number;

    @Column("varchar", { name: 'observaciones', nullable: true})
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field(type => Date)
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    @Field()
    usuarioRegistro: string;

    @OneToMany(
        () => ProveedorProducto,
        (producto) => producto.proveedor
    )
    @Field(type => [ProveedorProducto], { nullable: true })
    proveedorProducto: ProveedorProducto[];

}
