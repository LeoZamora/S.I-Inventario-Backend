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
import { TipoOrdenes } from "./TipoOrden.entity";

@Index("PK_Ordenes", ["idOrden"], { unique: true })
@Index("UQ_codigoOrden", ["codigoOrden"], { unique: true })
@Entity("Ordenes", { schema: "dbo" })
export class Ordenes {
  @PrimaryGeneratedColumn({ type: "int", name: "idOrden" })
  idOrden: number;

  @Column("nvarchar", { name: "codigoOrden", unique: true, length: 50 })
  codigoOrden: string;

  @Column("nvarchar", { name: 'noReferencia', length: 50, nullable: true })
  noReferencia: string | null

  @Column("varchar", { name: "observaciones", nullable: true, length: 50 })
  observaciones: string | null;

  @Column("int", { name: "idSolicitud"})
  idSolicitud: number;

  @Column("int", { name: "idTipoOrden"})
  idTipoOrden: number;

  @Column("datetime2", { name: "fechaEmision", default: () => "getdate()" })
  fechaEmision: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @ManyToOne(
    () => SolicitudesTraslado,
    (solicitud) => solicitud.orden
  )
  @JoinColumn([
    { name: "idSolicitud", referencedColumnName: "idSolicitud" },
  ])
  solicitudes: SolicitudesTraslado;

  @ManyToOne(
    () => TipoOrdenes,
    (solicitud) => solicitud.ordenes
  )
  @JoinColumn([
    { name: "idTipoOrden", referencedColumnName: "idTipoOrden" },
  ])
  tipoOrden: SolicitudesTraslado;

  @OneToMany(() => DetalleSalida, (detalleOrden) => detalleOrden.orden)
  detalleOrdens: DetalleSalida[];

  @OneToMany(() => EstadoOrden, (estadoOrden) => estadoOrden.orden)
  estadoOrden: EstadoOrden[];

  @OneToMany(() => MovimientoInventario, (movInv) => movInv.orden)
  movimientoInventario: MovimientoInventario[];
}
