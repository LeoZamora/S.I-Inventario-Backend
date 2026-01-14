import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccesoriosPerifericos } from "../AccesoriosPerifericos.entity";
import { Impresoras } from "../Impresoras.entity";

@Index("PK_TipoConexion", ["idTipoConexion"], { unique: true })
@Entity("TipoConexion", { schema: "dbo" })
export class TipoConexion {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoConexion" })
  idTipoConexion: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 50 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(
    () => AccesoriosPerifericos,
    (accesoriosPerifericos) => accesoriosPerifericos.tipoConexion
  )
  accesoriosPerifericos: AccesoriosPerifericos[];

  @OneToMany(() => Impresoras, (impresoras) => impresoras.tipoConexion)
  impresoras: Impresoras[];
}
