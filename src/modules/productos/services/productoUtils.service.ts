import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TipoAlmacenamiento } from "../entities/catalogComputo/TipoAlmacenamiento.entity";
import { TipoDispositivo } from "../entities/catalogComputo/TipoDispositivo.entity";
import { DataSource, Repository } from "typeorm";
import { tipoCompDTO } from "../dtos/tipoInfo.dto";

@Injectable()
export class ProductosUtilsServices {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('TIPO_ALM_PROVIDE')
        private tipoAlmacenamiento: Repository<TipoAlmacenamiento>,

        @Inject('TIPO_DISP_PROVIDE')
        private tipoDispositivo: Repository<TipoDispositivo>
    ) {}

    async findTipoAlmacenamiento(): Promise<TipoAlmacenamiento[]> {
        return (await this.tipoAlmacenamiento.find())
    }

    async findTipoDispositivo(): Promise<TipoDispositivo[]> {
        return (await this.tipoDispositivo.find())
    }

    async createTipoAlm(tipo: tipoCompDTO) {
        const exist = await this.tipoAlmacenamiento.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de almacenamiento'
            )
        }

        try {
            const newTipoAlm = this.tipoAlmacenamiento.create(tipo)
            await this.tipoAlmacenamiento.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Almacenamiento creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear producto: ${error.message}`
            );
        }
    }

    async createTipoDisp(tipo: tipoCompDTO) {
        const exist = await this.tipoDispositivo.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de dispositivo'
            )
        }

        try {
            const newTipoAlm = this.tipoDispositivo.create(tipo)
            await this.tipoDispositivo.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Dispositivo creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear producto: ${error.message}`
            );
        }
    }
}