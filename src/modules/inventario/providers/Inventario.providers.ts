import { DataSource } from "typeorm";
import { Inventario } from "../entities/Inventario.entity";
import { Bodegas } from "../entities/Bodegas.entity";
import { DetalleMovimientoInventario } from "../../movimientos/entities/DetalleMovimientoInventario.entity";
import { EstadoInventario } from "../entities/EstadoInventario.entity";
import { InventarioCategoriasPermitidas } from "../entities/InventarioCategoriasPermitidas.entity";
import { InventarioProducto } from "../entities/InventarioProducto.entity";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";
import { TipoMovimientoInventario } from "../entities/TipoMovimientoInventario.entity";

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    INVENTARIO_PROVIDE: 'INVENTARIO_PROVIDE',
    BODEGAS_PROVIDE: 'BODEGAS_PROVIDE',
    DETMOVINV_PROVIDE: 'DETMOVINV_PROVIDE',
    ESTADOINV_PROVIDE: 'ESTADOINV_PROVIDE',
    INVCATPERM_PROVIDE: 'INVCATPERM_PROVIDE',
    INVENTARIOPROD_PROVIDE: 'INVENTARIOPROD_PROVIDE',
    MOVINV_PROVIDE: 'MOVINV_PROVIDE',
    TIPOINVENT_PROVIDE: 'TIPOINVET_PROVIDE',
}


export const inventarioProviders = [
    {
        provide: TOKENS.INVENTARIO_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(Inventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.BODEGAS_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(Bodegas),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.DETMOVINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(DetalleMovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.ESTADOINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(EstadoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.INVCATPERM_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(InventarioCategoriasPermitidas),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.INVENTARIOPROD_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(InventarioProducto),
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