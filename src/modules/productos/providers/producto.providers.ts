import { DataSource } from "typeorm";
import { Producto } from "../entities/Producto.entity";
import { Mobiliario } from "../entities/Mobiliario.entity";
import { Impresoras } from "../entities/Impresoras.entity";
import { EquiposComputo } from "../entities/EquiposComputo.entity";
import { ArmasFuego } from "../entities/ArmasFuego.entity";
import { AccesoriosPerifericos } from "../entities/AccesoriosPerifericos.entity";
import { EstadoProducto } from "../entities/EstadoProducto.entity";
import { TipoProducto } from "../entities/TipoProducto.entity";

const injectData = ['DATA_SOURCE']

export const productoProviders = [
    {
        provide: 'PRODUCTO_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Producto),
        inject: injectData
    },
    {
        provide: 'MOBILIARIO_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Mobiliario),
        inject: injectData
    },
    {
        provide: 'IMPRESORAS_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Impresoras),
        inject: injectData
    },
    {
        provide: 'EQUIPOS_COMPUTO_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EquiposComputo),
        inject: injectData
    },
    {
        provide: 'ARMAS_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ArmasFuego),
        inject: injectData
    },
    {
        provide: 'ACCESORIOS_PERIFERICOS_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AccesoriosPerifericos),
        inject: injectData
    },
    {
        provide: 'ESTADOPROD_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EstadoProducto),
        inject: injectData
    },
    {
        provide: 'TIPOPROD_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TipoProducto),
        inject: injectData
    },
]