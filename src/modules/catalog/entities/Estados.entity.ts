import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { EstadoDepartamento } from "../../departamento/entities/EstadoDepartamento.entity";
import { EstadoInventario } from "../../inventario/entities/EstadoInventario.entity";
import { EstadoOrden } from "../../ordenes/entities/EstadoOrden.entity";
import { EstadoProducto } from "src/modules/productos/entities/EstadoProducto.entity";
import { TipoEstados } from "./TipoEstados.entity";
import { EstadosSolicitud } from '../../movimientos/entities/EstadoSolicitud.entity';

@Index("IX_Estados_TipoEstados", ["idTipoEstado"], {})
@Index("UQ_codigoEstado", ["codigoEstado"], { unique: true })
@Index("PK_Estados", ["idEstado"], { unique: true })
@Entity("Estados", { schema: "dbo" })
@ObjectType()
export class Estados {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstado" })
  @Field(type => Int)
  idEstado: number;

  @Column("varchar", { name: "codigoEstado", length: 50 })
  @Field()
  codigoEstado: string;

  @Column("varchar", { name: "nombreEstado", length: 50 })
  @Field(type => Int)
  nombreEstado: string;

  @Column("varchar", { name: "descripcion", length: 300, nullable: true })
  @Field(type => String, { nullable: true })
  descripcion: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @Column("int", { name: "idTipoEstado" })
  @Field(type => Int)
  idTipoEstado: number;

  @OneToMany(
    () => EstadoDepartamento,
    (estadoDepartamento) => estadoDepartamento.estados
  )
  @Field(type => [EstadoDepartamento])
  estadoDepartamentos: EstadoDepartamento[];

  @OneToMany(
    () => EstadoInventario,
    (estadoInventario) => estadoInventario.estados
  )
  @Field(type => [EstadoInventario])
  estadoInventarios: EstadoInventario[];

  @OneToMany(() => EstadoOrden, (estadoOrden) => estadoOrden.estados)
  @Field(type => [EstadoOrden])
  estadoOrden: EstadoOrden[];

  @OneToMany(() => EstadoProducto, (estadoProducto) => estadoProducto.estados)
  @Field(type => [EstadoProducto])
  estadoProductos: EstadoProducto[];

  @OneToMany(() => EstadosSolicitud, (estadoProducto) => estadoProducto.estados)
  @Field(type => [EstadosSolicitud])
  estadosSolicitud: EstadosSolicitud[];

  @ManyToOne(() => TipoEstados, (tipoEstados) => tipoEstados.estados)
  @JoinColumn([{ name: "idTipoEstado", referencedColumnName: "idTipoEstado" }])
  @Field(type => TipoEstados)
  tipoEstados: TipoEstados;
}
