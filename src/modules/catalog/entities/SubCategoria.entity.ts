import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { InventarioCategoriasPermitidas } from "src/modules/inventario/entities/InventarioCategoriasPermitidas.entity";
import { Producto } from "src/modules/productos/entities/Producto.entity";
import { Categoria } from "./Categoria.entity";

@Index("IX_SubCategoria_Categoria", ["idCategoria"], {})
@Index("PK_SubCategoria", ["idSubCategoria"], { unique: true })
@Index("UQ_codigoSubCategoria", ["codigoSubCategoria"], { unique: true })
@Entity("SubCategoria", { schema: "dbo" })
export class SubCategoria {
  @PrimaryGeneratedColumn({ type: "int", name: "idSubCategoria" })
  idSubCategoria: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "codigoSubCategoria", length: 50 })
  codigoSubCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idCategoria" })
  idCategoria: number;

  @OneToMany(
    () => InventarioCategoriasPermitidas,
    (inventarioCategoriasPermitidas) =>
      inventarioCategoriasPermitidas.subCategoria
  )
  inventarioCategoriasPermitidas: InventarioCategoriasPermitidas[];

  @OneToMany(() => Producto, (producto) => producto.subCategoria)
  productos: Producto[];

  @ManyToOne(() => Categoria, (categoria) => categoria.subCategorias)
  @JoinColumn([{ name: "idCategoria", referencedColumnName: "idCategoria" }])
  categoria: Categoria;
}
