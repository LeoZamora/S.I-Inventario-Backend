import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
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
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "idProducto" })
  idProducto: number;

  @Column("nvarchar", { name: "codigoProducto", unique: true, length: 50 })
  codigoProducto: string;

  @Column("varchar", { name: "nombreProducto", length: 50 })
  nombreProducto: string;

  @Column("varchar", { name: "marca", length: 50 })
  marca: string;

  @Column("varchar", { name: "modelo", length: 50 })
  modelo: string;

  @Column("varchar", { name: "observaciones", nullable: true, length: 100 })
  observaciones: string | null;

  @Column("varchar", { name: "imagen", nullable: true})
  imagen: string | null;

  @Column("varchar", { name: "caracteristicasEspeciales", nullable: true })
  caracteristicasEspeciales: string | null;

  @Column("decimal", {
    name: "precio",
    precision: 18,
    scale: 4,
    default: () => "(0)",
  })
  precio: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("datetime2", { name: 'fechaUltModificacion', nullable: true})
  fechaUltModificacion: Date | null;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idSubCategoria" })
  idSubCategoria: number;

  @Column("int", { name: "idTipoProducto" })
  idTipoProducto: number;

  @OneToMany(
    () => AccesoriosPerifericos,
    (accesoriosPerifericos) => accesoriosPerifericos.idProducto
  )
  accesoriosPerifericos: AccesoriosPerifericos[];

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idProducto)
  armasFuegos: ArmasFuego[];

  @OneToMany(
    () => DetalleMovimientoInventario,
    (detalleMovimientoInventario) => detalleMovimientoInventario.producto
  )
  detalleMovimientoInventarios: DetalleMovimientoInventario[];

  @OneToMany(() => DetalleSalida, (detalleOrden) => detalleOrden.idProducto)
  detalleOrdens: DetalleSalida[];

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.producto
  )
  equiposComputos: EquiposComputo[];

  @OneToMany(
    () => EstadoProducto,
    (estadoProducto) => estadoProducto.producto
  )
  estadoProductos: EstadoProducto[];

  @OneToMany(
    () => ProveedorProducto,
    (provProd) => provProd.producto
  )
  proveedores: ProveedorProducto[];

  @OneToMany(() => Impresoras, (impresoras) => impresoras.idProducto)
  impresoras: Impresoras[];

  @OneToMany(() => DetalleDepreciacion, (depreciacion) => depreciacion.producto)
  detalleDepreciacion: DetalleDepreciacion[];

  @OneToMany(
    () => InventarioProducto,
    (inventarioProducto) => inventarioProducto.producto
  )
  inventarioProductos: InventarioProducto[];

  @OneToMany(() => Mobiliario, (mobiliario) => mobiliario.idProducto)
  mobiliarios: Mobiliario[];

  @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria.productos)
  @JoinColumn([
    { name: "idSubCategoria", referencedColumnName: "idSubCategoria" },
  ])
  subCategoria: SubCategoria;

  @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.productos)
  @JoinColumn([
    { name: "idTipoProducto", referencedColumnName: "idTipoProducto" },
  ])
  tipoProducto: TipoProducto;
}
