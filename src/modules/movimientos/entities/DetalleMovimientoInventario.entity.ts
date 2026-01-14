import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { Producto } from "../../productos/entities/Producto.entity";

@Index("IX_DetalleMovimientoInventario_Movimiento", ["idMovInv"], {})
@Index("IX_DetalleMovimientoInventario_Producto", ["idProducto"], {})
@Index("PK_DetalleMovimientoInventario", ["idDetalleMovInv"], { unique: true })
@Entity("DetalleMovimientoInventario", { schema: "dbo" })
export class DetalleMovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idDetalleMovInv" })
  idDetalleMovInv: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("int", { name: "cantidad", default: () => "(1)" })
  cantidad: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("int", { name: "idMovInv" })
  idMovInv: number;

  @Column("decimal", {
    name: "precioUnitario",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  precioUnitario: number;

  @ManyToOne(
    () => MovimientoInventario,
    (movimientoInventario) => movimientoInventario.detalleMovimientoInventarios,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "idMovInv", referencedColumnName: "idMovInv" }])
  movimientoInventario: MovimientoInventario;

  @ManyToOne(
    () => Producto,
    (producto) => producto.detalleMovimientoInventarios
  )
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;
}
