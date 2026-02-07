import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Ubicaciones } from "./Ubicaciones.entity";
import { Inventario } from "./Inventario.entity";
import { SolicitudesTraslado } from "../../movimientos/entities/SolicitudesTraslado.entity";

@Index("PK_Bodegas", ["idBodega"], { unique: true })
@Index("UQ_codigoBodega", ["codigoBodega"], { unique: true })
@Entity("Bodegas", { schema: "dbo" })
@ObjectType()
export class Bodegas {
  @PrimaryGeneratedColumn({ type: "int", name: "idBodega" })
  @Field(() => Int)
  idBodega: number;

  @Column("nvarchar", { name: "codigoBodega", unique: true, length: 50 })
  @Field()
  codigoBodega: string;

  @Column("varchar", { name: "nombreBodega", length: 50 })
  @Field()
  nombreBodega: string;

  @Column("varchar", { name: "descripcion", nullable: true })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  @Field()
  usuarioRegistro: string;

  @Column("int", { name: "idUbicacion"})
  @Field(() => Int)
  idUbicacion: number;

  @ManyToOne(() => Ubicaciones, (ubicaciones) => ubicaciones.bodegas)
  @JoinColumn([{ name: "idUbicacion", referencedColumnName: "idUbicacion" }])
  @Field(() => Ubicaciones)
  ubicacion: Ubicaciones;

  @OneToMany(() => Inventario, (inventario) => inventario.bodegas)
  @Field(() => [Inventario])
  inventarios: Inventario[];

  @OneToMany(() => SolicitudesTraslado, (solicitud) => solicitud.bodegaSolicitada)
  @Field(() => [SolicitudesTraslado])
  solicitudesComoSolicitada: SolicitudesTraslado[];

  @OneToMany(() => SolicitudesTraslado, (solicitud) => solicitud.bodegaSolicitante)
  @Field(() => [SolicitudesTraslado])
  solicitudesComoSolicitante: SolicitudesTraslado[];
}