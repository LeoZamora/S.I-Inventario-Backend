import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DetalleSalida } from "./DetalleOrden.entity";
import { EstadoOrden } from './EstadoOrden.entity';
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { SolicitudesTraslado } from '../../movimientos/entities/SolicitudesTraslado.entity';
import { TipoOrdenes } from "./TipoOrden.entity";

@Index("PK_Ordenes", ["idOrden"], { unique: true })
@Index("UQ_codigoOrden", ["codigoOrden"], { unique: true })
@Entity("Ordenes", { schema: "dbo" })
@ObjectType()
export class Ordenes {
  @PrimaryGeneratedColumn({ type: "int", name: "idOrden" })
  @Field(() => Int)
  idOrden: number;

  @Column("nvarchar", { name: "codigoOrden", unique: true, length: 50 })
  @Field()
  codigoOrden: string;

  @Column("nvarchar", { name: 'noReferencia', length: 50, nullable: true })
  @Field(type => String, { nullable: true })
  noReferencia: string | null

  @Column("varchar", { name: "observaciones", nullable: true, length: 50 })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("int", { name: "idSolicitud"})
  @Field(() => Int)
  idSolicitud: number;

  @Column("int", { name: "idTipoOrden"})
  @Field(() => Int)
  idTipoOrden: number;

  @Column("datetime2", { name: "fechaEmision", default: () => "getdate()" })
  @Field()
  fechaEmision: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @ManyToOne(
    () => SolicitudesTraslado,
    (solicitud) => solicitud.orden
  )
  @JoinColumn([
    { name: "idSolicitud", referencedColumnName: "idSolicitud" },
  ])
  @Field(() => SolicitudesTraslado)
  solicitudes: SolicitudesTraslado;

  @ManyToOne(
    () => TipoOrdenes,
    (tipo) => tipo.ordenes
  )
  @JoinColumn([
    { name: "idTipoOrden", referencedColumnName: "idTipoOrden" },
  ])
  @Field(() => TipoOrdenes)
  tipoOrden: TipoOrdenes;

  @OneToMany(() => DetalleSalida, (detalleOrden) => detalleOrden.orden)
  @Field(() => [DetalleSalida])
  detalleOrdens: DetalleSalida[];

  @OneToMany(() => EstadoOrden, (estadoOrden) => estadoOrden.orden)
  @Field(() => [EstadoOrden])
  estadoOrden: EstadoOrden[];

  @OneToMany(() => MovimientoInventario, (movInv) => movInv.orden)
  @Field(() => [MovimientoInventario])
  movimientoInventario: MovimientoInventario[];
}