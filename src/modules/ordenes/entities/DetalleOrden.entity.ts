import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "../../productos/entities/Producto.entity";
import { Ordenes } from "./Ordenes.entity";

@Index("PK_DetalleOrden", ["idDetalleSalida"], { unique: true })
@Entity("DetalleSalida", { schema: "dbo" })
export class DetalleSalida {
  @PrimaryGeneratedColumn({ type: "int", name: "idDetalleSalida" })
  idDetalleSalida: number;

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

  @Column("int", { name: 'idOrden' })
  idOrden: number

  @ManyToOne(() => Producto, (producto) => producto.detalleOrdens)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;

  @ManyToOne(() => Ordenes, (ordenes) => ordenes.detalleOrdens)
  @JoinColumn([{ name: "idOrden", referencedColumnName: "idOrden" }])
  orden: Ordenes;
}
