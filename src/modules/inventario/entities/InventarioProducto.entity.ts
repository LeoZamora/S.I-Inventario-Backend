import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Inventario } from "./Inventario.entity";
import { Producto } from "../../productos/entities/Producto.entity";

@Index("IX_InventarioProducto_Inventario", ["idInventario"], {})
@Index("IX_InventarioProducto_Producto", ["idProducto"], {})
@Index("PK_InventarioProducto", ["idProductoInventario"], { unique: true })
@Entity("InventarioProducto", { schema: "dbo" })
@ObjectType()
export class InventarioProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idProductoInventario" })
  @Field(() => Int)
  idProductoInventario: number;

  @Column("int", { name: "stockMin", default: () => "(0)" })
  @Field(() => Int)
  stockMin: number;

  @Column("int", { name: "stockMax"})
  @Field(() => Int)
  stockMax: number;

  @Column("int", { name: "stock", default: () => "(1)" })
  @Field(() => Int)
  stock: number;

  @Column("bit", { name: "estado", default: () => "(1)" })
  @Field(() => Int)
  estado: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idInventario" })
  @Field(() => Int)
  idInventario: number;

  @Column("int", { name: "idProducto" })
  @Field(() => Int)
  idProducto: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.inventarioProductos)
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  @Field(() => Inventario)
  inventario: Inventario;

  @ManyToOne(() => Producto, (producto) => producto.inventarioProductos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(() => Producto)
  producto: Producto;
}