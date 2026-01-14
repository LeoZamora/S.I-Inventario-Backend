import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados.entity";

@Index("PK_TipoEstados", ["idTipoEstado"], { unique: true })
@Entity("TipoEstados", { schema: "dbo" })
export class TipoEstados {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoEstado" })
  idTipoEstado: number;

  @Column("varchar", { name: "nombreTipoEstado", length: 50 })
  nombreTipoEstado: string;

  @Column("varchar", { name: "descripcion", length: 300 })
  descripcion: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => Estados, (estados) => estados.tipoEstados)
  estados: Estados[];
}
