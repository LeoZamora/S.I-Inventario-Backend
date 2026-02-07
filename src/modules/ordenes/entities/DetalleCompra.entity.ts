import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrdenesEntrada } from "./OrdenesEntrada.entity";
import { Producto } from "src/modules/productos/entities/Producto.entity";
import { Proveedores } from "src/modules/proveedores/entities/Proveedores.entity";

@Index("PK_DetalleEntrada", ["idDetalleEntrada"], { unique: true })
@Entity('DetalleEntrada', { schema: 'dbo' })
@ObjectType()
export class DetalleEntrada {

    @PrimaryGeneratedColumn({ type: "int", name: "idDetalleEntrada" })
    @Field(() => Int)
    idDetalleEntrada: number

    @Column("varchar", { name: "observaciones", nullable: true })
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @Column("int", { name: "cantidad", default: () => "(1)" })
    @Field(() => Int)
    cantidad: number;

    @Column("int", { name: 'idProducto' })
    @Field(() => Int)
    idProducto: number

    @Column("int", { name: 'idOrdenEntrada' })
    @Field(() => Int)
    idOrdenEntrada: number

    @Column("int", { name: 'idProveedor' })
    @Field(() => Int)
    idProveedor: number

    @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
    @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
    @Field(() => Producto)
    producto: Producto;

    @ManyToOne(() => OrdenesEntrada, (orden) => orden.detalleEntrada)
    @JoinColumn([{ name: "idOrdenEntrada", referencedColumnName: "idOrdenEntrada" }])
    @Field(() => OrdenesEntrada)
    ordenesEntrada: OrdenesEntrada;

    @ManyToOne(() => Proveedores, (prov) => prov.proveedor)
    @JoinColumn([{ name: "idProveedor", referencedColumnName: "idProveedor" }])
    @Field(() => Proveedores)
    proveedor: Proveedores;
}