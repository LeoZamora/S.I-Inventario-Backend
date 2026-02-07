import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("PK_TipoProducto", ["idTipoProducto"], { unique: true })
@Entity("TipoProducto", { schema: "dbo" })
@ObjectType()
export class TipoProducto {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoProducto" })
  @Field(type => Int)
  idTipoProducto: number;

  @Column("varchar", { name: "nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field(type => Date)
  fechaRegistro: Date;

  @OneToMany(() => Producto, (producto) => producto.tipoProducto)
  @Field(type => [Producto])
  productos: Producto[];
}
