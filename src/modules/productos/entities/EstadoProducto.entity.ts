import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { Producto } from "./Producto.entity";

@Index("IX_EstadoProducto_Estados", ["idEstado"], {})
@Index("IX_EstadoProducto_Producto", ["idProducto"], {})
@Index("PK_EstadoProducto", ["idEstadoProducto"], { unique: true })
@Entity("EstadoProducto", { schema: "dbo" })
export class EstadoProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoProducto" })
  idEstadoProducto: number;

  @Column("varchar", { name: "observaciones" })
  observaciones: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("int", { name: "idEstado" })
  idEstado: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoProductos)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  estados: Estados;

  @ManyToOne(() => Producto, (producto) => producto.estadoProductos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;
}
