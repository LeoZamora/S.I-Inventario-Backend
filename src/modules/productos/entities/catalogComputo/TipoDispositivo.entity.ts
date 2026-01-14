import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquiposComputo } from "../EquiposComputo.entity";

@Index("PK_TipoDispositivo", ["idTipoDispositivo"], { unique: true })
@Entity("TipoDispositivo", { schema: "dbo" })
export class TipoDispositivo {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoDispositivo" })
  idTipoDispositivo: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.idTipoDispositivo2
  )
  equiposComputos: EquiposComputo[];
}
