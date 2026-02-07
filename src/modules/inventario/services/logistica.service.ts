import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Bodegas } from "../entities/Bodegas.entity";
import { Ubicaciones } from '../entities/Ubicaciones.entity';
import { bodegaDTO, ubicacionDTO } from "../dtos/logistica.dto";

@Injectable()
export class LogisticaServices {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('BODEGAS_PROVIDE')
        private bodegaRepository: Repository<Bodegas>,

        @Inject('UBICACION_PROVIDE')
        private ubicacionRepository: Repository<Ubicaciones>
    ) {}

    async findAllUbicaciones(): Promise<Ubicaciones[]> {
        return (await this.ubicacionRepository.find())
    }

    async findAllBodegas(): Promise<Bodegas[]> {
        return (await this.bodegaRepository.find())
    }

    async createUbicacion(ubicacion: ubicacionDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const exist = await queryRunner.manager.findOne(Ubicaciones, {
                where: { codigoUbicacion: ubicacion.codigoUbicacion }
            })

            if(exist) {
                throw new BadRequestException(
                    'El codigo de la ubicacion ya se encuentra en uso'
                )
            }

            const newUbicacion = queryRunner.manager.create(Ubicaciones, ubicacion)
            await queryRunner.manager.save(Ubicaciones, newUbicacion)

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Ubicacion creada'
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear la bodega: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    async createBodega(bodega: bodegaDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const exist = await queryRunner.manager.findOne(Bodegas, {
                where: { codigoBodega: bodega.codigoBodega }
            })

            if(exist) {
                throw new BadRequestException(
                    'El codigo de la bodega ya se encuentra en uso'
                )
            }

            const existUbicacion = await queryRunner.manager.findOne(Ubicaciones, {
                where: { idUbicacion: bodega.idUbicacion }
            })

            if(!existUbicacion) {
                throw new BadRequestException(
                    'La ubicacion no se encuentra registrada'
                )
            }

            const newUbicacion = queryRunner.manager.create(Bodegas, bodega)
            await queryRunner.manager.save(Bodegas, newUbicacion)

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Bodega creada'
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear la bodega: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }
}