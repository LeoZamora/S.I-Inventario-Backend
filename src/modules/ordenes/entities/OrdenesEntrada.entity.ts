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

import { SolicitudesTraslado } from "src/modules/movimientos/entities/SolicitudesTraslado.entity";
import { DetalleEntrada } from "./DetalleCompra.entity";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { EstadoOrdenEntrada } from "./EstadoOrdenEntrada.entity";

@Unique(['codigoCompra'])
@Index("PK_OrdenesEntrada", ["idOrdenEntrada"], { unique: true })
@Entity('OrdenesEntrada', { schema: 'dbo' })
export class OrdenesEntrada {
    @PrimaryGeneratedColumn({ type: "int", name: 'idOrdenEntrada' })
    idOrdenEntrada: number

    @Column("nvarchar", { name: 'codigoCompra', length: 50 })
    codigoCompra: string

    @Column("nvarchar", { name: 'noReferencia', length: 50, nullable: true })
    noReferencia: string | null

    @Column('varchar', { name: 'observaciones', nullable: true })
    observaciones: string | null

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    fechaRegistro: Date;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    usuarioRegistro: string;

    @Column("int", { name: "idSolicitud" })
    idSolicitud: number;

    @ManyToOne(() => SolicitudesTraslado, (solicitud) => solicitud.ordenesEntrada)
    @JoinColumn([{ name: "idSolicitud", referencedColumnName: "idSolicitud" }])
    solicitud: SolicitudesTraslado;

    @OneToMany(() => DetalleEntrada, (detalleOrden) => detalleOrden.ordenesEntrada)
    detalleEntrada: DetalleEntrada[];

    @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.ordenesEntrada)
    movimiento: MovimientoInventario[];

    @OneToMany(() => EstadoOrdenEntrada, (estado) => estado.ordenEntrada)
    estadosOrdenEntrada: EstadoOrdenEntrada[];
}