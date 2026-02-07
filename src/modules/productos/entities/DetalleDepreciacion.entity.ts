import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@Entity("DetalleDepreciacion", { schema: 'dbo' })
@ObjectType()
export class DetalleDepreciacion {
    @PrimaryGeneratedColumn({ type: 'int', name: 'idDetalleDepreciacion' })
    @Field(type => Int)
    idDetalleDepreciacion: number

    @Column({ name: 'aniosDepreciacion', type: 'int' })
    @Field(type => Int)
    aniosDepreciacion: number

    @Column({ name: 'costoActivo', type: "decimal" })
    @Field(type => Int)
    costoActivo: number

    @Column({ name: 'depreciacionAnual', type: "decimal" })
    @Field(type => Int)
    depreciacionAnual: number

    @Column({ name: 'depreciacionMen', type: "decimal" })
    @Field(type => Int)
    depreciacionMen: number

    @Column({ name: 'valorLibro', type: "decimal" })
    @Field(type => Int)
    valorLibro: number

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field(() => Date)
    fechaRegistro: Date;

    @Column("int", { name: "idProducto" })
    @Field(type => Int)
    idProducto: number;

    @ManyToOne(() => Producto, (producto) => producto.detalleDepreciacion, {})
    @JoinColumn({
        name: 'idProducto',
        referencedColumnName: 'idProducto',
    })
    @Field(type => Producto)
    producto: Producto;
}




