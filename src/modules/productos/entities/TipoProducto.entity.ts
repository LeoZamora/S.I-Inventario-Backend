import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";

@Index("PK_TipoProducto", ["idTipoProducto"], { unique: true })
@Entity("TipoProducto", { schema: "dbo" })
export class TipoProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoProducto" })
  idTipoProducto: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @OneToMany(() => Producto, (producto) => producto.tipoProducto)
  productos: Producto[];
}
