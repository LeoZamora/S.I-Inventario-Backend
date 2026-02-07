import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ubicaciones } from "./Ubicaciones.entity";
import { Inventario } from "./Inventario.entity";
import { SolicitudesTraslado } from "../../movimientos/entities/SolicitudesTraslado.entity";

@Index("PK_Bodegas", ["idBodega"], { unique: true })
@Index("UQ_codigoBodega", ["codigoBodega"], { unique: true })
@Entity("Bodegas", { schema: "dbo" })
export class Bodegas {
  @PrimaryGeneratedColumn({ type: "int", name: "idBodega" })
  idBodega: number;

  @Column("nvarchar", { name: "codigoBodega", unique: true, length: 50 })
  codigoBodega: string;

  @Column("varchar", { name: "nombreBodega", length: 50 })
  nombreBodega: string;

  @Column("varchar", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idUbicacion"})
  idUbicacion: number;

  @ManyToOne(() => Ubicaciones, (ubicaciones) => ubicaciones.bodegas)
  @JoinColumn([{ name: "idUbicacion", referencedColumnName: "idUbicacion" }])
  ubicacion: Ubicaciones;

  @OneToMany(() => Inventario, (inventario) => inventario.bodegas)
  inventarios: Inventario[];

  @OneToMany(() => SolicitudesTraslado, (solicitud) => solicitud.bodegaSolicitada)
  solicitudesComoSolicitada: SolicitudesTraslado[];

  @OneToMany(() => SolicitudesTraslado, (solicitud) => solicitud.bodegaSolicitante)
  solicitudesComoSolicitante: SolicitudesTraslado[];
}
