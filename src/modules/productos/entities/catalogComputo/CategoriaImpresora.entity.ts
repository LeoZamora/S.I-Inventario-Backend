import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Impresoras } from "../Impresoras.entity";

@Index("PK_CategoriaImpresora", ["idCategoriaImpresora"], { unique: true })
@Entity("CategoriaImpresora", { schema: "dbo" })
export class CategoriaImpresora {
  @PrimaryGeneratedColumn({ type: "int", name: "idCategoriaImpresora" })
  idCategoriaImpresora: number;

  @Column("varchar", { name: "nombreCategoria", length: 50 })
  nombreCategoria: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 50 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => Impresoras, (impresoras) => impresoras.categoriaImpresora)
  impresoras: Impresoras[];
}
