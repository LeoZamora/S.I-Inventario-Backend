import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";

@Index("PK_TipoMovimientoInventario", ["idTipoMovimiento"], { unique: true })
@Entity("TipoMovimientoInventario", { schema: "dbo" })
@ObjectType()
export class TipoMovimientoInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "idTipoMovimiento" })
  @Field(() => Int)
  idTipoMovimiento: number;

  @Column("varchar", { name: "nombreMovimiento", length: 50 })
  @Field()
  nombreMovimiento: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  @Field(type => String, { nullable: true })
  descripcion: string | null;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  @Field()
  fechaRegistro: Date;

  @OneToMany(
    () => MovimientoInventario,
    (movimientoInventario) => movimientoInventario.tipoMovimiento
  )
  @Field(() => [MovimientoInventario])
  movimientoInventarios: MovimientoInventario[];
}