import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { SolicitudesTraslado } from "./SolicitudesTraslado.entity";
import { Producto } from "src/modules/productos/entities/Producto.entity";

@Index("PK_DetalleSolicitud", ["idDetalleSolicitud"], { unique: true })
@Entity('DetalleSolicitud', { schema: 'dbo' })
@ObjectType()
export class DetalleSolicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "idDetalleSolicitud" })
    @Field(() => Int)
    idDetalleSolicitud: number

    @Column("varchar", { name: "observaciones", nullable: true })
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @Column("int", { name: "cantidad", default: () => "(1)" })
    @Field(() => Int)
    cantidad: number;

    @Column("decimal", {
        name: "precioUnitario",
        precision: 18,
        scale: 4,
        default: () => "(0)",
    })
    @Field(() => Float)
    precioUnitario: number;

    @Column("int", { name: 'idProducto' })
    @Field(() => Int)
    idProducto: number

    @Column("int", { name: 'idSolicitud' })
    @Field(() => Int)
    idSolicitud: number

    @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
    @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
    @Field(() => Producto)
    producto: Producto;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.detalleSolicitud)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    @Field(() => SolicitudesTraslado)
    solicitud: SolicitudesTraslado;
}