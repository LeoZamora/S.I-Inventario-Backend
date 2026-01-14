import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bodegas } from "./Bodegas.entity";

@Index("PK_Ubicacion", ["idUbicacion"], { unique: true })
@Index("UQ_codigoUbicacion", ["codigoUbicacion"], { unique: true })
@Entity("Ubicaciones", { schema: "dbo" })
export class Ubicaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "idUbicacion" })
  idUbicacion: number;

  @Column("varchar", { name: "codigoUbicacion", unique: true, length: 50 })
  codigoUbicacion: string;

  @Column("varchar", { name: "nombreUbicacion", length: 300 })
  nombreUbicacion: string;

  @Column("varchar", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @OneToMany(() => Bodegas, (bodegas) => bodegas.ubicacion)
  bodegas: Bodegas[];
}
