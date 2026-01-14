import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Categoria } from "../entities/Categoria.entity";
import { SubCategoria } from "../entities/SubCategoria.entity";
import { categoriaDTO, subCategoriaDTO } from "../dtos/categorias.dto";


@Injectable()
export class CategoriaServices {
    constructor(
        @Inject('CATEGORIA_PROVIDE')
        private categoriaRepository: Repository<Categoria>,
        @Inject('SUBCATEGORIA_PROVIDE')
        private subCategoriaRepository: Repository<SubCategoria>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findAllCategoria(): Promise<Categoria[]> {
        return this.categoriaRepository.find()
    }

    async createCategoria(categoria: categoriaDTO) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        const exist = await queryRunner.manager.findOne(Categoria, {
            where: { nombreCategoria: categoria.nombreCategoria }
        })

        if (exist) {
            throw new BadRequestException(
                'La categoria ya existe'
            )
        }

        try {
            const newCateogria = queryRunner.manager.create(Categoria, categoria)
            await queryRunner.manager.save(newCateogria)

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Categoria creada'
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

    async finAllSubCategoria(): Promise<SubCategoria[]> {
        return this.subCategoriaRepository.find()
    }


    async createSubCategoria(subCategoria: subCategoriaDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        const exist = await queryRunner.manager.findOne(SubCategoria, {
            where: { codigoSubCategoria: subCategoria.codigoSubCategoria }
        })

        if (exist) {
            throw new BadRequestException(
                'La subactegoria ya se encuentra registrada'
            )
        }

        try {
            const newSubCat = queryRunner.manager.create(SubCategoria, subCategoria)
            await queryRunner.manager.save(newSubCat)

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'SubCategoria creada'
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear la subcategoria: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }
}