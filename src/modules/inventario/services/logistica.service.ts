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
        return (await this.ubicacionRepository.find({
            relations: ['bodegas'],
            order: { idUbicacion: "ASC" }
        }))
    }

    async findUbicacionById(id: number) {
        return (await this.ubicacionRepository.findOne({
            where: { idUbicacion: id },
            relations: [
                'bodegas',
            ],
            order: { idUbicacion: "ASC" }
        }))
    }

    async findAllBodegas(): Promise<Bodegas[]> {
        return (await this.bodegaRepository.find({
            relations: ['ubicacion'],
            order: { idBodega: "ASC" }
        }))
    }

    async findAllBodegasById(id: number) {
        return (await this.bodegaRepository.find({
            where: { idUbicacion: id },
            relations: ['ubicacion'],
            order: { idBodega: "ASC" }
        }))
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

    async getCodigoUbicacion() {
        let codigo: string;

        const ultimoRegistro = await this.ubicacionRepository.find({
            order: {
                idUbicacion: "DESC"
            },
            take: 1
        })

        if (ultimoRegistro.length > 0) {
            const [code, num] = ultimoRegistro[0].codigoUbicacion.split("_")
            const next = (parseInt(num, 10) + 1).toString().padStart(num.length, "0")
            codigo = `${code}_${next}`;
        } else {
            codigo = `UBI_0001`
        }

        return codigo
    }

    async getCodigoBodega() {
        let codigo: string;

        const ultimoRegistro = await this.bodegaRepository.find({
            order: {
                idBodega: "DESC"
            },
            take: 1
        })

        if (ultimoRegistro.length > 0) {
            const [code, num] = ultimoRegistro[0].codigoBodega.split("_")
            const next = (parseInt(num, 10) + 1).toString().padStart(num.length, "0")
            codigo = `${code}_${next}`;
        } else {
            codigo = `BDG_0001`
        }

        return codigo
    }

    async findBodegaById(id: number) {
        return (await this.bodegaRepository.findOne({
            where: { idBodega: id },
            relations: [],
            order: { idBodega: "ASC" }
        }))
    }

    // async getCodigoBodega(id: number) {
    //     let codigo: string;
    //     const ubicacion = await this.ubicacionRepository.findOne({
    //         where: { idUbicacion: id }
    //     })

    //     if (!ubicacion) {
    //         throw new BadRequestException(
    //             'Categoria no ha sido encontrada'
    //         )
    //     }

    //     const ultimoRegistro = await this.bodegaRepository.find({
    //         where: { idBodega: ubicacion?.idUbicacion },
    //         order: {
    //             idBodega: "DESC"
    //         },
    //         take: 1
    //     })

    //     if (ultimoRegistro.length > 0) {
    //         const [code, num] = ultimoRegistro[0].codigoBodega.split("_")
    //         const next = (parseInt(num, 10) + 1).toString().padStart(num.length, "0")
    //         codigo = `${code}_${next}`;
    //     } else {
    //         codigo = `BDG_0001`
    //     }

    //     return codigo
    // }
}