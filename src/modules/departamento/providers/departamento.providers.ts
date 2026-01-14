import { DataSource } from "typeorm";
import { Departamento } from "../entities/Departamento.entity";
import { EstadoDepartamento } from "../entities/EstadoDepartamento.entity";

const TOKES = {
    DATA_SOURCE: 'DATA_SOURCE',
    DEPTO_PROVIDE: 'DEPTO_PROVIDE',
    ESTADODEPTOP_PROVIDE: 'ESTADODEPTOP_PROVIDE',
}

export const departamentoProviders = [
    {
        provide: TOKES.DEPTO_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Departamento),
        inject: [TOKES.DATA_SOURCE]
    },
    {
        provide: TOKES.ESTADODEPTOP_PROVIDE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EstadoDepartamento),
        inject: [TOKES.DATA_SOURCE]
    },
]