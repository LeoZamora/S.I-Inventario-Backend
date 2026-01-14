import { DataSource } from "typeorm"
import { SistemaDisparo } from "../entities/catalogArmas/SistemaDisparo.entity"
import { TipoArma } from "../entities/catalogArmas/TipoArma.entity"
import { TipoCalibre } from "../entities/catalogArmas/TipoCalibre.entity"

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    SISTEMADISP_PROVIDE: 'SISTEMADISP_PROVIDE',
    TIPO_ARMA_PROVIDE: 'TIPO_ARMA_PROVIDE',
    TIPO_CALIBRE_PROVIDE: 'TIPO_CALIBRE_PROVIDE'
}

export const catalogArmasProviders = [
    {
        provide: TOKENS.SISTEMADISP_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(SistemaDisparo),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_ARMA_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoArma),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_CALIBRE_PROVIDE,
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(TipoCalibre),
        inject: [TOKENS.DATA_SOURCE]
    }
]