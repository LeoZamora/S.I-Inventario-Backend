import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoConexion } from "./catalogComputo/TipoConexion.entity";
import { Producto } from "./Producto.entity";
import { CategoriaImpresora } from "./catalogComputo/CategoriaImpresora.entity";
import { TipoImpresora } from "./catalogComputo/TipoImpresora.entity";

@Index("IX_Impresoras_CategoriaImpresora", ["idCategoriaImpresora"], {})
@Index("IX_Impresoras_TipoConexion", ["idTipoConexion"], {})
@Index("IX_Impresoras_TipoImpresion", ["idTipoImpresion"], {})
@Index("PK_Impresoras", ["idImpresora"], { unique: true })
@Entity("Impresoras", { schema: "dbo" })
export class Impresoras {
  @PrimaryGeneratedColumn({ type: "int", name: "idImpresora" })
  idImpresora: number;

  @Column("varchar", { name: "color", nullable: true, length: 50 })
  color: string | null;

  @Column("varchar", { name: "noSerie", length: 50 })
  noSerie: string;

  @Column("int", { name: "idTipoImpresion" })
  idTipoImpresion: number;

  @Column("int", { name: "idCategoriaImpresora" })
  idCategoriaImpresora: number;

  @Column("int", { name: "idTipoConexion" })
  idTipoConexion: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @ManyToOne(() => TipoConexion, (tipoConexion) => tipoConexion.impresoras)
  @JoinColumn([
    { name: "idTipoConexion", referencedColumnName: "idTipoConexion" },
  ])
  tipoConexion: TipoConexion;

  @ManyToOne(() => Producto, (producto) => producto.impresoras)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;

  @ManyToOne(
    () => CategoriaImpresora,
    (categoriaImpresora) => categoriaImpresora.impresoras
  )
  @JoinColumn([
    {
      name: "idCategoriaImpresora",
      referencedColumnName: "idCategoriaImpresora",
    },
  ])
  categoriaImpresora: CategoriaImpresora;

  @ManyToOne(() => TipoImpresora, (tipoImpresora) => tipoImpresora.impresoras)
  @JoinColumn([
    { name: "idTipoImpresion", referencedColumnName: "idTipoImpresion" },
  ])
  tipoImpresion: TipoImpresora;
}
