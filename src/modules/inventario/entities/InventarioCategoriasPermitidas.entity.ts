import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubCategoria } from "src/modules/catalog/entities/SubCategoria.entity";
import { Inventario } from "./Inventario.entity";

@Index("IX_InventarioCategoriasPermitidas_Inventario", ["idInventario"], {})
@Index("IX_InventarioCategoriasPermitidas_SubCategoria", ["idSubCategoria"], {})
@Index("PK_InventarioCategoriasPermitidas", ["idCategoriaPermitida"], {
  unique: true,
})
@Entity("InventarioCategoriasPermitidas", { schema: "dbo" })
export class InventarioCategoriasPermitidas {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoriaPermitida" })
  idCategoriaPermitida: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 100 })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("int", { name: "idInventario" })
  idInventario: number;

  @Column("int", { name: "idSubCategoria" })
  idSubCategoria: number;

  @ManyToOne(
    () => SubCategoria,
    (subCategoria) => subCategoria.inventarioCategoriasPermitidas
  )
  @JoinColumn([
    { name: "idSubCategoria", referencedColumnName: "idSubCategoria" },
  ])
  subCategoria: SubCategoria;

  @ManyToOne(
    () => Inventario,
    (inventario) => inventario.inventarioCategoriasPermitidas
  )
  @JoinColumn([{ name: "idInventario", referencedColumnName: "idInventario" }])
  inventario: Inventario;
}
