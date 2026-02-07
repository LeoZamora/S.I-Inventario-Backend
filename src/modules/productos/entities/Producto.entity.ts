import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { AccesoriosPerifericos } from "./AccesoriosPerifericos.entity";
import { ArmasFuego } from "./ArmasFuego.entity";
import { DetalleMovimientoInventario } from "../../movimientos/entities/DetalleMovimientoInventario.entity";
import { DetalleSalida } from "src/modules/ordenes/entities/DetalleOrden.entity";
import { EquiposComputo } from "./EquiposComputo.entity";
import { EstadoProducto } from "./EstadoProducto.entity";
import { Impresoras } from "./Impresoras.entity";
import { InventarioProducto } from "../../inventario/entities/InventarioProducto.entity";
import { Mobiliario } from "./Mobiliario.entity";
import { SubCategoria } from "src/modules/catalog/entities/SubCategoria.entity";
import { TipoProducto } from "./TipoProducto.entity";
import { ProveedorProducto } from "./ProveedorProducto.entity";
import { DetalleDepreciacion } from "./DetalleDepreciacion.entity";

@Index("IX_Producto_SubCategoria", ["idSubCategoria"], {})
@Index("IX_Producto_TipoProducto", ["idTipoProducto"], {})
@Index("PK_Producto", ["idProducto"], { unique: true })
@Index("UQ_codigoProducto", ["codigoProducto"], { unique: true })
@Entity("Producto", { schema: "dbo" })
@ObjectType()
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @Column("nvarchar", { name: "codigoProducto", unique: true, length: 50 })
  @Field()
  codigoProducto: string;

  @Column("varchar", { name: "nombreProducto", length: 50 })
  @Field()
  nombreProducto: string;

  @Column("varchar", { name: "marca", length: 50 })
  @Field()
  marca: string;

  @Column("varchar", { name: "modelo", length: 50 })
  @Field()
  modelo: string;

  @Column("varchar", { name: "observaciones", nullable: true, length: 100 })
  @Field(type => String, { nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "imagen", nullable: true})
  @Field(type => String, { nullable: true })
  imagen: string | null;

  @Column("varchar", { name: "caracteristicasEspeciales", nullable: true })
  @Field(type => String, { nullable: true })
  caracteristicasEspeciales: string | null;

  @Column("decimal", {
    name: "precio",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  @Field(type => Float)
  precio: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("datetime2", { name: 'fechaUltModificacion', nullable: true})
  @Field(type => Date)
  fechaUltModificacion: Date | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idSubCategoria" })
  @Field(type => Int)
  idSubCategoria: number;

  @Column("int", { name: "idTipoProducto" })
  @Field(type => Int)
  idTipoProducto: number;

  @OneToMany(
    () => AccesoriosPerifericos,
    (accesoriosPerifericos) => accesoriosPerifericos.idProducto
  )
  @Field(() => [AccesoriosPerifericos])
  accesoriosPerifericos: AccesoriosPerifericos[];

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idProducto)
  @Field(() => [ArmasFuego])
  armasFuegos: ArmasFuego[];

  @OneToMany(
    () => DetalleMovimientoInventario,
    (detalleMovimientoInventario) => detalleMovimientoInventario.producto
  )
  @Field(() => [DetalleMovimientoInventario])
  detalleMovimientoInventarios: DetalleMovimientoInventario[];

  @OneToMany(() => DetalleSalida, (detalleOrden) => detalleOrden.idProducto)
  @Field(() => [DetalleSalida])
  detalleOrdens: DetalleSalida[];

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.producto
  )
  @Field(() => [EquiposComputo])
  equiposComputos: EquiposComputo[];

  @OneToMany(
    () => EstadoProducto,
    (estadoProducto) => estadoProducto.producto
  )
  @Field(() => [EstadoProducto])
  estadoProductos: EstadoProducto[];

  @OneToMany(
    () => ProveedorProducto,
    (provProd) => provProd.producto
  )
  @Field(() => [ProveedorProducto])
  proveedores: ProveedorProducto[];

  @OneToMany(() => Impresoras, (impresoras) => impresoras.idProducto)
  @Field(() => [Impresoras])
  impresoras: Impresoras[];

  @OneToMany(() => DetalleDepreciacion, (depreciacion) => depreciacion.producto)
  @Field(() => [DetalleDepreciacion])
  detalleDepreciacion: DetalleDepreciacion[];

  @OneToMany(
    () => InventarioProducto,
    (inventarioProducto) => inventarioProducto.producto
  )
  @Field(() => [InventarioProducto])
  inventarioProductos: InventarioProducto[];

  @OneToMany(() => Mobiliario, (mobiliario) => mobiliario.idProducto)
  @Field(() => [Mobiliario])
  mobiliarios: Mobiliario[];

  @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria.productos)
  @JoinColumn([
    { name: "idSubCategoria", referencedColumnName: "idSubCategoria" },
  ])
  @Field(() => SubCategoria)
  subCategoria: SubCategoria;

  @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.productos)
  @JoinColumn([
    { name: "idTipoProducto", referencedColumnName: "idTipoProducto" },
  ])
  @Field(() => TipoProducto)
  tipoProducto: TipoProducto;
}
