import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "../../productos/entities/Producto.entity";
import { OrdenesSalida } from "./OrdenesSalida.entity";

@Index("PK_DetalleOrden", ["idDetalleOrden"], { unique: true })
@Entity("DetalleSalida", { schema: "dbo" })
export class DetalleSalida {
  @PrimaryGeneratedColumn({ type: "int", name: "idDetalleOrden" })
  idDetalleOrden: number;

  @Column("int", { name: "cantidad", default: () => "(1)" })
  cantidad: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("decimal", {
    name: "precioUnitario",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  precioUnitario: number;

  @Column("int", { name: 'idProducto' })
  idProducto: number

  @Column("int", { name: 'idOrdenSalida' })
  idOrdenSalida: number

  @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;

  @ManyToOne(() => OrdenesSalida, (ordenes) => ordenes.detalleOrdens)
  @JoinColumn([{ name: "idOrdenSalida", referencedColumnName: "idOrdenSalida" }])
  orden: OrdenesSalida;
}
