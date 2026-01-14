import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EstadoInventario } from "./EstadoInventario.entity";
import { Departamento } from "../../departamento/entities/Departamento.entity";
import { Bodegas } from "./Bodegas.entity";
import { InventarioCategoriasPermitidas } from "./InventarioCategoriasPermitidas.entity";
import { InventarioProducto } from "./InventarioProducto.entity";

@Index("PK_Inventario", ["idInventario"], { unique: true })
@Index("UQ_CodigoInventario", ["codigoInventario"], { unique: true })
@Entity("Inventario", { schema: "dbo" })
export class Inventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idInventario" })
  idInventario: number;

  @Column("nvarchar", { name: "codigoInventario", unique: true, length: 50 })
  codigoInventario: string;

  @Column("varchar", { name: "nombreInventario", length: 100 })
  nombreInventario: string;

  @Column("bit", { name: "estado", default: () => "(1)" })
  estado: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("varchar", { name: "usuarioRegistro", length: 500 })
  usuarioRegistro: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("int", { name: 'idBodega', nullable: true})
  idBodega: number;

  @Column("int", { name: 'idDepartamento', nullable: true})
  idDepartamento: number;

  @OneToMany(
    () => EstadoInventario,
    (estadoInventario) => estadoInventario.inventario
  )
  estadoInventarios: EstadoInventario[];

  @ManyToOne(() => Departamento, (departamento) => departamento.inventarios)
  @JoinColumn([
    { name: "idDepartamento", referencedColumnName: "idDepartamento" },
  ])
  departamento: Departamento;

  @ManyToOne(() => Bodegas, (bodegas) => bodegas.inventarios)
  @JoinColumn([{ name: "idBodega", referencedColumnName: "idBodega" }])
  bodegas: Bodegas;

  @OneToMany(
    () => InventarioCategoriasPermitidas,
    (inventarioCategoriasPermitidas) =>
      inventarioCategoriasPermitidas.inventario
  )
  inventarioCategoriasPermitidas: InventarioCategoriasPermitidas[];

  @OneToMany(
    () => InventarioProducto,
    (inventarioProducto) => inventarioProducto.inventario
  )
  inventarioProductos: InventarioProducto[];
}
