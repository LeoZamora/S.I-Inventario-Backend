import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EstadoDepartamento } from "../../departamento/entities/EstadoDepartamento.entity";
import { EstadoInventario } from "../../inventario/entities/EstadoInventario.entity";
import { EstadoOrden } from "../../ordenes/entities/EstadoOrden.entity";
import { EstadoProducto } from "src/modules/productos/entities/EstadoProducto.entity";
import { TipoEstados } from "./TipoEstados.entity";
import { EstadosSolicitud } from '../../movimientos/entities/EstadoSolicitud.entity';

@Index("IX_Estados_TipoEstados", ["idTipoEstado"], {})
@Index("UQ_codigoEstado", ["codigoEstado"], { unique: true })
@Index("PK_Estados", ["idEstado"], { unique: true })
@Entity("Estados", { schema: "dbo" })
export class Estados {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstado" })
  idEstado: number;

  @Column("varchar", { name: "codigoEstado", length: 50 })
  codigoEstado: string;

  @Column("varchar", { name: "nombreEstado", length: 50 })
  nombreEstado: string;

  @Column("varchar", { name: "descripcion", length: 300 })
  descripcion: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("int", { name: "idTipoEstado" })
  idTipoEstado: number;

  @OneToMany(
    () => EstadoDepartamento,
    (estadoDepartamento) => estadoDepartamento.estados
  )
  estadoDepartamentos: EstadoDepartamento[];

  @OneToMany(
    () => EstadoInventario,
    (estadoInventario) => estadoInventario.estados
  )
  estadoInventarios: EstadoInventario[];

  @OneToMany(() => EstadoOrden, (estadoOrden) => estadoOrden.estados)
  estadoOrden: EstadoOrden[];

  @OneToMany(() => EstadoProducto, (estadoProducto) => estadoProducto.estados)
  estadoProductos: EstadoProducto[];

  @OneToMany(() => EstadosSolicitud, (estadoProducto) => estadoProducto.estados)
  estadosSolicitud: EstadoProducto[];

  @ManyToOne(() => TipoEstados, (tipoEstados) => tipoEstados.estados)
  @JoinColumn([{ name: "idTipoEstado", referencedColumnName: "idTipoEstado" }])
  tipoEstados: TipoEstados;
}
