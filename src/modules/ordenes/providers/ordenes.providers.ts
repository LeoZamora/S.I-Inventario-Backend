import { DataSource } from "typeorm";
import { Ordenes } from "../entities/Ordenes.entity";
import { EstadoOrden } from '../entities/EstadoOrden.entity';
import { DetalleSalida } from "../entities/DetalleOrden.entity";
import { OrdenesEntrada } from "../entities/OrdenesEntrada.entity";
import { EstadoOrdenEntrada } from '../entities/EstadoOrdenEntrada.entity';
import { DetalleEntrada } from "../entities/DetalleCompra.entity";
import { TipoOrdenes } from "../entities/TipoOrden.entity";

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    ORDENES_PROVIDE: 'ORDENES_PROVIDE',
    ORDENES_ENTRADA_PROVIDE: 'ORDENES_ENTRADA_PROVIDE',
    ESTADO_ORDEN_PROVIDE: 'ESTADO_ORDEN_PROVIDE',
    DETALLE_ORDEN_PROVIDE: 'DETALLE_ORDEN_PROVIDE',
    ESTADO_ORDEN_ENTRADA_PROVIDE: 'ESTADO_ORDEN_ENTRADA_PROVIDE',
    DETALLE_ORDEN_ENTRADA_PROVIDE: 'DETALLE_ORDEN_ENTRADA_PROVIDE',
    TIPO_ORDEN_PROVIDE: 'TIPO_ORDEN_PROVIDE',
}

export const ordenesProviders = [
    {
        provide: TOKENS.ORDENES_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Ordenes),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.ESTADO_ORDEN_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EstadoOrden),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.DETALLE_ORDEN_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DetalleSalida),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.ORDENES_ENTRADA_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdenesEntrada),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.ESTADO_ORDEN_ENTRADA_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EstadoOrdenEntrada),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.DETALLE_ORDEN_ENTRADA_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DetalleEntrada),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_ORDEN_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TipoOrdenes),
        inject: [TOKENS.DATA_SOURCE]
    },
]