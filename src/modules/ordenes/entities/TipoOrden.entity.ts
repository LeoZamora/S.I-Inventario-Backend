import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Ordenes } from "./Ordenes.entity";
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Index("PK_TipoSolicitud", ["idTipoOrden"], { unique: true })
@Entity("TipoOrden", { schema: "dbo" })
@ObjectType()
export class TipoOrdenes {
    @PrimaryGeneratedColumn({ type: "int", name: "idTipoOrden" })
    @Field(type => Int)
    idTipoOrden: number;

    @Column("varchar", { name: "nombre", length: 50 })
    @Field()
    nombre: string;

    @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
    @Field(type => String, { nullable: true })
    descripcion: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field(type => Date)
    fechaRegistro: Date;

    @OneToMany(
        () => Ordenes,
        (orden) => orden.tipoOrden
    )
    @Field(type => [Ordenes])
    ordenes: Ordenes[];
}
