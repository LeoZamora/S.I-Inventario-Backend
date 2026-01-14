import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { TipoDispositivo } from "./catalogComputo/TipoDispositivo.entity";
import { TipoAlmacenamiento } from "./catalogComputo/TipoAlmacenamiento.entity";

@Index("IX_EquiposComputo_TipoAlmacenamiento", ["idTipoAlmacenamiento"], {})
@Index("IX_EquiposComputo_TipoDispositivo", ["idTipoDispositivo"], {})
@Index("PK_EquiposComputo", ["idEquipoComputo"], { unique: true })
@Entity("EquiposComputo", { schema: "dbo" })
export class EquiposComputo {
  @PrimaryGeneratedColumn({ type: "int", name: "idEquipoComputo" })
  idEquipoComputo: number;

  @Column("int", { name: "ramGB" })
  ramGB: number;

  @Column("int", { name: "cantidadAlm" })
  cantidadAlm: number;

  @Column("varchar", { name: "procesador", length: 50 })
  procesador: string;

  @Column("int", { name: "idTipoDispositivo" })
  idTipoDispositivo: number;

  @Column("int", { name: "idTipoAlmacenamiento" })
  idTipoAlmacenamiento: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @ManyToOne(() => Producto, (producto) => producto.equiposComputos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;

  @ManyToOne(
    () => TipoDispositivo,
    (tipoDispositivo) => tipoDispositivo.equiposComputos
  )
  @JoinColumn([
    { name: "idTipoDispositivo", referencedColumnName: "idTipoDispositivo" },
  ])
  idTipoDispositivo2: TipoDispositivo;

  @ManyToOne(
    () => TipoAlmacenamiento,
    (tipoAlmacenamiento) => tipoAlmacenamiento.equiposComputos
  )
  @JoinColumn([
    {
      name: "idTipoAlmacenamiento",
      referencedColumnName: "idTipoAlmacenamiento",
    },
  ])
  tipoAlmacenamiento: TipoAlmacenamiento;
}
