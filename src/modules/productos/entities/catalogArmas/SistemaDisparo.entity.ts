import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArmasFuego } from "../ArmasFuego.entity";

@Index("PK_SistemaDisparo", ["idSistemaDisparo"], { unique: true })
@Entity("SistemaDisparo", { schema: "dbo" })
export class SistemaDisparo {
  @PrimaryGeneratedColumn({ type: "int", name: "idSistemaDisparo" })
  idSistemaDisparo: number;

  @Column("varchar", { name: "nombreSistema", length: 100 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => ArmasFuego, (armasFuego) => armasFuego.idSistemaDisparo2)
  armasFuegos: ArmasFuego[];
}
