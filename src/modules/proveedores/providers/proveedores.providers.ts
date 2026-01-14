import { DataSource } from "typeorm";
import { Proveedores } from "../entities/Proveedores.entity";
import { ProveedorProducto } from "src/modules/productos/entities/ProveedorProducto.entity";

export const proveedoresProviders = [
    {
        provide: 'PROVEEDORES_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Proveedores),
        inject: ['DATA_SOURCE']
    }, {
        provide: 'PROVPROD_PROVIDE',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProveedorProducto),
        inject: ['DATA_SOURCE']
    }
]