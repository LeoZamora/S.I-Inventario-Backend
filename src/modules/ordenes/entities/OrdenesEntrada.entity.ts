import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SolicitudesTraslado } from "src/modules/movimientos/entities/SolicitudesTraslado.entity";
import { DetalleEntrada } from "./DetalleCompra.entity";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { EstadoOrdenEntrada } from "./EstadoOrdenEntrada.entity";

@Unique(['codigoOrden'])
@Index("PK_OrdenesEntrada", ["idOrdenEntrada"], { unique: true })
@Entity('OrdenesEntrada', { schema: 'dbo' })
@ObjectType()
export class OrdenesEntrada {

    @PrimaryGeneratedColumn({ type: "int", name: 'idOrdenEntrada' })
    @Field(() => Int)
    idOrdenEntrada: number

    @Column("nvarchar", { name: 'codigoOrden', length: 50, unique: true })
    @Field()
    codigoOrden: string

    @Column("nvarchar", { name: 'noReferencia', length: 50, nullable: true })
    @Field(type => String, { nullable: true })
    noReferencia: string | null

    @Column('varchar', { name: 'observaciones', nullable: true })
    @Field(type => String, { nullable: true })
    observaciones: string | null

    @Column("datetime2", { name: "fechaOrden", default: () => "getdate()" })
    @Field()
    fechaOrden: Date;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field()
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    @Field()
    usuarioRegistro: string;

    @Column("int", { name: "idSolicitud", nullable: true })
    @Field(() => Int, { nullable: true })
    idSolicitud: number | null;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.ordenesEntrada)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    @Field(() => SolicitudesTraslado, { nullable: true })
    solicitud: SolicitudesTraslado;

    @OneToMany(() => DetalleEntrada, (detalleOrden) => detalleOrden.ordenesEntrada)
    @Field(() => [DetalleEntrada])
    detalleEntrada: DetalleEntrada[];

    @OneToMany(() => EstadoOrdenEntrada, (estado) => estado.ordenEntrada)
    @Field(() => [EstadoOrdenEntrada])
    estadosOrdenEntrada: EstadoOrdenEntrada[];
}