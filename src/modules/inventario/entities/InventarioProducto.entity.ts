import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventario } from "./Inventario.entity";
import { Producto } from "../../productos/entities/Producto.entity";

@Index("IX_InventarioProducto_Inventario", ["idInventario"], {})
@Index("IX_InventarioProducto_Producto", ["idProducto"], {})
@Index("PK_InventarioProducto", ["idProductoInventario"], { unique: true })
@Entity("InventarioProducto", { schema: "dbo" })
export class InventarioProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idProductoInventario" })
  idProductoInventario: number;

  @Column("int", { name: "stockMin", default: () => "(0)" })
  stockMin: number;

  @Column("int", { name: "stockMax"})
  stockMax: number;

  @Column("int", { name: "stock", default: () => "(1)" })
  stock: number;

  @Column("bit", { name: "estado", default: () => "(1)" })
  estado: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idInventario" })
  idInventario: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.inventarioProductos)
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  inventario: Inventario;

  @ManyToOne(() => Producto, (producto) => producto.inventarioProductos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;
}
