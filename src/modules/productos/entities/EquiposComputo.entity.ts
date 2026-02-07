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
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("IX_EquiposComputo_TipoAlmacenamiento", ["idTipoAlmacenamiento"], {})
@Index("IX_EquiposComputo_TipoDispositivo", ["idTipoDispositivo"], {})
@Index("PK_EquiposComputo", ["idEquipoComputo"], { unique: true })
@Entity("EquiposComputo", { schema: "dbo" })
@ObjectType()
export class EquiposComputo {
  @PrimaryGeneratedColumn({ type: "int", name: "idEquipoComputo" })
  @Field(type => Int)
  idEquipoComputo: number;

  @Column("int", { name: "ramGB" })
  @Field(type => Int)
  ramGB: number;

  @Column("int", { name: "cantidadAlm" })
  @Field(type => Int)
  cantidadAlm: number;

  @Column("varchar", { name: "procesador", length: 50 })
  @Field(type => String)
  procesador: string;

  @Column("int", { name: "idTipoDispositivo" })
  @Field(type => Int)
  idTipoDispositivo: number;

  @Column("int", { name: "idTipoAlmacenamiento" })
  @Field(type => Int)
  idTipoAlmacenamiento: number;

  @Column("int", { name: "idProducto" })
  @Field(type => Int)
  idProducto: number;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @ManyToOne(() => Producto, (producto) => producto.equiposComputos)
  @JoinColumn([{ name: "idProducto", referencedColumnName: "idProducto" }])
  @Field(type => Producto)
  producto: Producto;

  @ManyToOne(
    () => TipoDispositivo,
    (tipoDispositivo) => tipoDispositivo.equiposComputos
  )
  @JoinColumn([
    { name: "idTipoDispositivo", referencedColumnName: "idTipoDispositivo" },
  ])
  @Field(type => TipoDispositivo)
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
  @Field(type => TipoAlmacenamiento)
  tipoAlmacenamiento: TipoAlmacenamiento;
}
