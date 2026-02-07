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
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Entity('ProveedorProducto', { schema: 'dbo' })
@ObjectType()
export class ProveedorProducto {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idDetProvProd' })
    @Field(type => Int)
    idDetProvProd: number

    @Column('varchar', { name: "observaciones", length: 300, nullable: true})
    @Field(type => String, { nullable: true })
    observaciones: string | null

    @Column('varchar', { name: "fechaRegistro"})
    @Field(type => Date)
    fechaRegistro: Date

    @Column('varchar', { name: "usuarioRegistro", length: 50})
    @Field()
    usuarioRegistro: string

    @Column("int", { name: "idProducto" })
    @Field(type => Int)
    idProducto: number;

    @Column("int", { name: "idProducto" })
    @Field(type => Int)
    idProveedor: number;

    @ManyToOne(() => Producto, (prod) => prod.proveedores)
    @JoinColumn([{
        name: 'idProducto',
        referencedColumnName: 'idProducto'
    }])
    @Field(type => Producto)
    producto: Producto

    @ManyToOne(() => Proveedores, (prod) => prod.proveedor)
    @JoinColumn([{
        name: 'idProveedor',
        referencedColumnName: 'idProveedor'
    }])
    @Field(type => Proveedores)
    proveedor: Proveedores
}