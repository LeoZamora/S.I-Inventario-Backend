import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubCategoria } from "./SubCategoria.entity";

@Index("PK_Categoria", ["idCategoria"], { unique: true })
@Entity("Categoria", { schema: "dbo" })
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoria" })
  idCategoria: number;

  @Column("varchar", { name: "nombreCategoria", length: 100 })
  nombreCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("nvarchar", { name: "codigoSubCategoria", length: 50 })
  codigoSubCategoria: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @OneToMany(() => SubCategoria, (subCategoria) => subCategoria.categoria)
  subCategorias: SubCategoria[];
}
