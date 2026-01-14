import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "../../catalog/entities/Estados.entity";
import { Inventario } from "./Inventario.entity";

@Index("IX_EstadoInventario_Estados", ["idEstado"], {})
@Index("IX_EstadoInventario_Inventario", ["idInventario"], {})
@Index("PK_EstadoInventario", ["idEstadoInventario"], { unique: true })
@Entity("EstadoInventario", { schema: "dbo" })
export class EstadoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoInventario" })
  idEstadoInventario: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 300 })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaAsignacion", default: () => "getdate()" })
  fechaAsignacion: Date;

  @Column("int", { name: "idEstado" })
  idEstado: number;

  @Column("int", { name: "idInventario" })
  idInventario: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoInventarios)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  estados: Estados;

  @ManyToOne(() => Inventario, (inventario) => inventario.estadoInventarios)
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  inventario: Inventario;
}
