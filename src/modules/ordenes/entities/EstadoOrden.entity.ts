import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "../../catalog/entities/Estados.entity";
import { OrdenesSalida } from "./OrdenesSalida.entity";

@Index("IX_EstadoOrden_Estados", ["idEstado"], {})
@Index("IX_EstadoOrden_Ordenes", ["idOrdenSalida"], {})
@Index("PK_EstadoOrden", ["idEstadoOrden"], { unique: true })
@Entity("EstadoOrden", { schema: "dbo" })
export class EstadoOrden {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoOrden" })
  idEstadoOrden: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 50 })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("int", { name: "idEstado" })
  idEstado: number;

  @Column("int", { name: "idOrdenSalida" })
  idOrdenSalida: number;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @ManyToOne(() => Estados, (estados) => estados.estadoOrden)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  estados: Estados;

  @ManyToOne(() => OrdenesSalida, (ordenes) => ordenes.estadoOrden)
  @JoinColumn([{ name: "idOrdenSalida", referencedColumnName: "idOrdenSalida" }])
  orden: OrdenesSalida;
}
