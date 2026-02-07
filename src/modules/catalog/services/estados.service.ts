import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Estados } from "../entities/Estados.entity";
import { TipoEstados } from "../entities/TipoEstados.entity";

@Injectable()
export class EstadosServices {
    constructor(
        @Inject('ESTADOS_PROVIDE')
        private estados: Repository<Estados>,

        @Inject('TIPO_ESTADO_PROVIDE')
        private tipoEstados: Repository<TipoEstados>
    ){}

    async findAll(): Promise<Estados[]> {
        return (await this.estados.find())
    }

    async createEstado(estadoData: Partial<Estados>) {
        try {
            if (!estadoData.idTipoEstado) {
                throw new BadRequestException(
                    'El idTipoEstado es obligatorio'
                )
            }

            const codigoRecomendado = await this.getCodigoRecomendado(estadoData.idTipoEstado);
            const exist = await this.estados.findOne({
                where: { codigoEstado: codigoRecomendado }
            })

            if (exist) {
                throw new BadRequestException(
                    'Ya existe este estado'
                )
            }

            const newEstado = this.estados.create({
                codigoEstado: codigoRecomendado,
                nombreEstado: estadoData.nombreEstado,
                descripcion: estadoData.descripcion,
                idTipoEstado: estadoData.idTipoEstado
            })

            await this.estados.save(newEstado)

            return {
                code: 200,
                msg: 'Estado creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async getCodigoRecomendado(idTipoEstado: number): Promise<string> {
        const tipoEstado =  await this.tipoEstados.findOne({
            where: { idTipoEstado: idTipoEstado }
        })

        if (!tipoEstado) {
            throw new BadRequestException(
                'No existe el tipo de estado'
            )
        }

        try {
            const ultimoEstado = await this.estados.findOne({
                where: { idTipoEstado },
                order: { idEstado: 'DESC' }
            })
            let nuevoCodigoNumero = 1;

            if (ultimoEstado) {
                const ultimoCodigo = ultimoEstado.codigoEstado;
                const partes = ultimoCodigo.split('_');
                const numeroActual = parseInt(partes[1], 10);
                nuevoCodigoNumero = numeroActual + 1;
            }

            const nuevoCodigo = `${tipoEstado.codigoEstados}_${nuevoCodigoNumero.toString().padStart(4, '0')}`;
            return nuevoCodigo;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al obtener el código recomendado: ${error.message}`
            );
        }

    }

    async findAllTipoEstados(): Promise<TipoEstados[]> {
        return (await this.tipoEstados.find())
    }

    async createTipoEstado(tipoEstadoData: Partial<TipoEstados>) {
        const exist = await this.tipoEstados.findOne({
            where: { codigoTipoEstado: tipoEstadoData.codigoTipoEstado }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de estado'
            )
        }

        const existCodeForState = await this.tipoEstados.findOne({
            where: { codigoEstados: tipoEstadoData.codigoEstados }
        })

        if (existCodeForState) {
            throw new BadRequestException(
                'El codigo para los estados de este tipo de estado ya existe'
            )
        }

        try {
            const newTipoEstado = this.tipoEstados.create(tipoEstadoData)
            await this.tipoEstados.save(newTipoEstado)

            return {
                code: 200,
                msg: 'Tipo de Estado creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }
}