import { DataSource } from "typeorm";
import { DetalleMovimientoInventario } from "src/modules/movimientos/entities/DetalleMovimientoInventario.entity";
import { MovimientoInventario } from "../entities/MovimientoInventario.entity";
import { TipoMovimientoInventario } from "src/modules/inventario/entities/TipoMovimientoInventario.entity";

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    DETMOVINV_PROVIDE: 'DETMOVINV_PROVIDE',
    MOVINV_PROVIDE: 'MOVINV_PROVIDE',
    TIPOINVENT_PROVIDE: 'TIPOINVET_PROVIDE',
}


export const inventarioProviders = [
    {
        provide: TOKENS.DETMOVINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(DetalleMovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.MOVINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(MovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPOINVENT_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(TipoMovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    }
]