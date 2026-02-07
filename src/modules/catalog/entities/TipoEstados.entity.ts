import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados.entity";

@Index("UQ_codigoTipoEstado", ["codigoTipoEstado"], { unique: true })
@Index("PK_TipoEstados", ["idTipoEstado"], { unique: true })
@Entity("TipoEstados", { schema: "dbo" })
export class TipoEstados {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoEstado" })
  idTipoEstado: number;

  @Column("nvarchar", { name: "codigoTipoEstado", length: 50 })
  codigoTipoEstado: string;

  @Column("varchar", { name: "nombreTipoEstado", length: 50 })
  nombreTipoEstado: string;

  @Column("varchar", { name: "descripcion", length: 300 })
  descripcion: string;

  @Column("nvarchar", { name: "codigoEstados", length: 50 })
  codigoEstados: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => Estados, (estados) => estados.tipoEstados)
  estados: Estados[];
}
