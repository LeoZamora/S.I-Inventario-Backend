import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquiposComputo } from "../EquiposComputo.entity";

@Index("PK_TipoAlmacenamiento", ["idTipoAlmacenamiento"], { unique: true })
@Entity("TipoAlmacenamiento", { schema: "dbo" })
export class TipoAlmacenamiento {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoAlmacenamiento" })
  idTipoAlmacenamiento: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(
    () => EquiposComputo,
    (equiposComputo) => equiposComputo.tipoAlmacenamiento
  )
  equiposComputos: EquiposComputo[];
}
