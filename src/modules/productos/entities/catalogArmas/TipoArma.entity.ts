import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";

@Index("PK_TipoArma", ["idTipoArma"], { unique: true })
@Entity("TipoArma", { schema: "dbo" })
export class TipoArma {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoArma" })
  idTipoArma: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idTipoArma2)
  armasFuegos: ArmasFuego[];
}
