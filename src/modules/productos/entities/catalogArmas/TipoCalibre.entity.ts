import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";

@Index("PK_TipoCalibre", ["idCalibre"], { unique: true })
@Entity("TipoCalibre", { schema: "dbo" })
export class TipoCalibre {
  @PrimaryGeneratedColumn({ type: "int", name: "idCalibre" })
  idCalibre: number;

  @Column("varchar", { name: "nombreCalibre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idCalibre2)
  armasFuegos: ArmasFuego[];
}
