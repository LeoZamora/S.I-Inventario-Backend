import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
// Importaciones de GraphQL
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Estados } from "../../catalog/entities/Estados.entity";
import { OrdenesEntrada } from "./OrdenesEntrada.entity";

@Index("IX_EstadoOrden_Estados", ["idEstado"], {})
@Index("IX_EstadoOrden_Ordenes", ["idOrdenEntrada"], {})
@Index("PK_EstadoOrden", ["idEstadoOrden"], { unique: true })
@Entity("EstadoOrden", { schema: "dbo" })
@ObjectType()
export class EstadoOrdenEntrada {
    @PrimaryGeneratedColumn({ type: "int", name: "idEstadoOrdenEntrada" })
    @Field(() => Int)
    idEstadoOrden: number;

    @Column("varchar", { name: "observaciones", nullable: true, length: 50 })
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
    @Field()
    fechaRegistro: Date;

    @Column("int", { name: "idEstado" })
    @Field(() => Int)
    idEstado: number;

    @Column("int", { name: "idOrdenEntrada" })
    @Field(() => Int)
    idOrdenEntrada: number;

    @Column("varchar", { name: "usuarioRegistro", length: 50 })
    @Field()
    usuarioRegistro: string;

    @ManyToOne(() => Estados, (estados) => estados.estadoOrden)
    @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
    @Field(() => Estados)
    estados: Estados;

    @ManyToOne(() => OrdenesEntrada, (ordenes) => ordenes.estadosOrdenEntrada)
    @JoinColumn([{ name: "idOrdenEntrada", referencedColumnName: "idOrdenEntrada" }])
    @Field(() => OrdenesEntrada)
    ordenEntrada: OrdenesEntrada;
}