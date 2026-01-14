import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { DetalleSalida } from "./DetalleOrden.entity";
import { EstadoOrden } from './EstadoOrden.entity';
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { SolicitudesTraslado } from '../../movimientos/entities/SolicitudesTraslado.entity';

@Index("PK_Ordenes", ["idOrdenSalida"], { unique: true })
@Index("UQ_codigoOrden", ["codigoOrden"], { unique: true })
@Entity("OrdenesSalida", { schema: "dbo" })
export class OrdenesSalida {
  @PrimaryGeneratedColumn({ type: "int", name: "idOrdenSalida" })
  idOrdenSalida: number;

  @Column("nvarchar", { name: "codigoOrden", unique: true, length: 50 })
  codigoOrden: string;

  @Column("varchar", { name: "observaciones", nullable: true, length: 50 })
  observaciones: string | null;

  @Column("int", { name: "idSolicitud"})
  idSolicitud: number;

  @Column("datetime2", { name: "fechaEmision", default: () => "getdate()" })
  fechaEmision: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @ManyToOne(
    () => SolicitudesTraslado,
    (solicitud) => solicitud.ordenesSalida
  )
  @JoinColumn([
    { name: "idSolicitud", referencedColumnName: "idSolicitud" },
  ])
  solicitudes: SolicitudesTraslado;

  @OneToMany(() => DetalleSalida, (detalleOrden) => detalleOrden.orden)
  detalleOrdens: DetalleSalida[];

  @OneToMany(() => EstadoOrden, (estadoOrden) => estadoOrden.orden)
  estadoOrden: EstadoOrden[];

  @OneToMany(() => MovimientoInventario, (movInv) => movInv.orden)
  movimientoInventario: MovimientoInventario[];
}
