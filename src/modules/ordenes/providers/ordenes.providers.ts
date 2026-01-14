import { DataSource } from "typeorm";
import { OrdenesSalida } from "../entities/OrdenesSalida.entity";
import { EstadoOrden } from '../entities/EstadoOrden.entity';
import { DetalleSalida } from "../entities/DetalleOrden.entity";

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    ORDENES_PROVIDE: 'ORDENES_PROVIDE',
    ESTADO_ORDEN_PROVIDE: 'ESTADO_ORDEN_PROVIDE',
    DETALLE_ORDEN_PROVIDE: 'DETALLE_ORDEN_PROVIDE'
}

export const ordenesProviders = [
    {
        provide: TOKENS.ORDENES_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdenesSalida),
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
]