import { DataSource } from "typeorm";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { TipoEstados } from "../entities/TipoEstados.entity";

export const estadosProviders = [
    {
        provide: 'ESTADOS_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Estados),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'TIPO_ESTADO_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TipoEstados),
        inject: ['DATA_SOURCE']
    },
]
