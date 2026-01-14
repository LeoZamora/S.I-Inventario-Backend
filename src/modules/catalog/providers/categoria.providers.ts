import { DataSource } from "typeorm";
import { Categoria } from "../entities/Categoria.entity";
import { SubCategoria } from "../entities/SubCategoria.entity";

export const categoriasProviders = [
    {
        provide: 'CATEGORIA_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Categoria),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'SUBCATEGORIA_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SubCategoria),
        inject: ['DATA_SOURCE']
    },
]