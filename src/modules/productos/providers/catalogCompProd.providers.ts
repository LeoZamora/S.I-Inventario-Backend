import { DataSource } from "typeorm"
import { CategoriaImpresora } from "../entities/catalogComputo/CategoriaImpresora.entity"
import { TipoAlmacenamiento } from "../entities/catalogComputo/TipoAlmacenamiento.entity"
import { TipoConexion } from "../entities/catalogComputo/TipoConexion.entity"
import { TipoDispositivo } from "../entities/catalogComputo/TipoDispositivo.entity"
import { TipoImpresora } from "../entities/catalogComputo/TipoImpresora.entity"

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    CAT_IMPRESORA_PROVIDE: 'CAT_IMPRESORA_PROVIDE',
    TIPO_ALM_PROVIDE: 'TIPO_ALM_PROVIDE',
    TIPO_CONEXION_PROVIDE: 'TIPO_CONEXION_PROVIDE',
    TIPO_DISP_PROVIDE: 'TIPO_DISP_PROVIDE',
    TIPO_IMPRESORA_PROVIDE: 'TIPO_IMPRESORA_PROVIDE'
}

export const catalogCompProviders = [
    {
        provide: TOKENS.CAT_IMPRESORA_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(CategoriaImpresora),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_ALM_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoAlmacenamiento),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_CONEXION_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoConexion),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_DISP_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoDispositivo),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_IMPRESORA_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoImpresora),
        inject: [TOKENS.DATA_SOURCE]
    }
]