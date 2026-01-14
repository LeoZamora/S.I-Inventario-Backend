import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoConexion } from "./catalogComputo/TipoConexion.entity";
import { Producto } from "./Producto.entity";

@Index("IX_AccesoriosPerifericos_TipoConexion", ["idTipoConexion"], {})
@Index("PK_AccesoriosPerifericos", ["idPeriferico"], { unique: true })
@Entity("AccesoriosPerifericos", { schema: "dbo" })
export class AccesoriosPerifericos {
  @PrimaryGeneratedColumn({ type: "int", name: "idPeriferico" })
  idPeriferico: number;

  @Column("varchar", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("int", { name: "idTipoConexion" })
  idTipoConexion: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @ManyToOne(
    () => TipoConexion,
    (tipoConexion) => tipoConexion.accesoriosPerifericos
  )
  @JoinColumn([
    { name: "idTipoConexion", referencedColumnName: "idTipoConexion" },
  ])
  tipoConexion: TipoConexion;

  @ManyToOne(() => Producto, (producto) => producto.accesoriosPerifericos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;
}
