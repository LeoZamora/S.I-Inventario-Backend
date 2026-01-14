import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Inventario } from "../entities/Inventario.entity";
import { DataSource, Repository } from "typeorm";
import { inventarioDTO } from "../dtos/inventario.dto";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class InventarioServices {
    constructor(
        @Inject('INVENTARIO_PROVIDE')
        private inventarioReposity: Repository<Inventario>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findAll(): Promise<Inventario[]>{
        return (await this.inventarioReposity.find())
    }

    async createInventario(inventario: inventarioDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()


        try {
            const existCode = await queryRunner.manager.findOne(Inventario, {
                where: { codigoInventario: inventario.codigoInventario }
            })

            if (existCode) {
                throw new BadRequestException(
                    'El código de inventario ya está registrado',
                );
            }

            const newInventario = queryRunner.manager.create(Inventario, inventario)

            await queryRunner.manager.save(newInventario)
            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Inventario creado exitosamente'
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear producto: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }
}