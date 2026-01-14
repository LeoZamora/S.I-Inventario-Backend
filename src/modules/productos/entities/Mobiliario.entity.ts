import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";

@Index("PK_Mobiliario", ["idMobiliario"], { unique: true })
@Entity("Mobiliario", { schema: "dbo" })
export class Mobiliario {
  @PrimaryGeneratedColumn({ type: "int", name: "idMobiliario" })
  idMobiliario: number;

  @Column("varchar", { name: "color", length: 50 })
  color: string;

  @Column("varchar", { name: "usoDestinado" })
  usoDestinado: string;

  @Column("varchar", { name: "acabado", nullable: true })
  acabado: string | null;

  @Column("varchar", { name: "material" })
  material: string;

  @Column("varchar", { name: "dimensiones" })
  dimensiones: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @ManyToOne(() => Producto, (producto) => producto.mobiliarios)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;
}
