import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { TipoCalibre } from "./catalogArmas/TipoCalibre.entity";
import { TipoArma } from "./catalogArmas/TipoArma.entity";
import { SistemaDisparo } from "./catalogArmas/SistemaDisparo.entity";

@Index("IX_ArmasFuego_SistemaDisparo", ["idSistemaDisparo"], {})
@Index("IX_ArmasFuego_TipoArma", ["idTipoArma"], {})
@Index("IX_ArmasFuego_TipoCalibre", ["idCalibre"], {})
@Index("PK_ArmasFuego", ["idArma"], { unique: true })
@Entity("ArmasFuego", { schema: "dbo" })
export class ArmasFuego {
  @PrimaryGeneratedColumn({ type: "int", name: "idArma" })
  idArma: number;

  @Column("varchar", { name: "numSerie", length: 50 })
  numSerie: string;

  @Column("int", { name: "capacidadCargador", default: () => "(1)" })
  capacidadCargador: number;

  @Column("decimal", {
    name: "longitudCanon",
    nullable: true,
    precision: 18,
    scale: 4,
  })
  longitudCanon: number | null;

  @Column("bit", { name: "licencia", default: () => "(1)" })
  licencia: boolean;

  @Column("varchar", { name: "material", length: 50 })
  material: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("int", { name: "idCalibre" })
  idCalibre: number;

  @Column("int", { name: "idTipoArma" })
  idTipoArma: number;

  @Column("int", { name: "idSistemaDisparo" })
  idSistemaDisparo: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @ManyToOne(() => Producto, (producto) => producto.armasFuegos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  producto: Producto;

  @ManyToOne(() => TipoCalibre, (tipoCalibre) => tipoCalibre.armasFuegos)
  @JoinColumn([{ name: "idCalibre", referencedColumnName: "idCalibre" }])
  idCalibre2: TipoCalibre;

  @ManyToOne(() => TipoArma, (tipoArma) => tipoArma.armasFuegos)
  @JoinColumn([{ name: "idTipoArma", referencedColumnName: "idTipoArma" }])
  idTipoArma2: TipoArma;

  @ManyToOne(
    () => SistemaDisparo,
    (sistemaDisparo) => sistemaDisparo.armasFuegos
  )
  @JoinColumn([
    { name: "idSistemaDisparo", referencedColumnName: "idSistemaDisparo" },
  ])
  idSistemaDisparo2: SistemaDisparo;
}
