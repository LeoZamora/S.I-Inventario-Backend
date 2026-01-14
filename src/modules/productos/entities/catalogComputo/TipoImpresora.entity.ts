import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Impresoras } from "../Impresoras.entity";

@Index("PK_TipoImpresion", ["idTipoImpresion"], { unique: true })
@Entity("TipoImpresora", { schema: "dbo" })
export class TipoImpresora {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoImpresion" })
  idTipoImpresion: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => Impresoras, (impresoras) => impresoras.tipoImpresion)
  impresoras: Impresoras[];
}
