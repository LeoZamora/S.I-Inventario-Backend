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


    async createSubCategoria(subCategoria: Partial<SubCategoria>) {
        const queryRunner = this.dataSource.createQueryRunner()
        let codigo: string;

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const categoria = await this.categoriaRepository.findOne({
                where: { idCategoria: subCategoria.idCategoria }
            })
            const ultimoRegistro = await queryRunner.manager.find(SubCategoria, {
                order: {
                    idCategoria: 'DESC'
                },
                take: 1
            })

            if (!categoria) {
                throw new BadRequestException(
                    'Categoria no ha sido encontrada'
                )
            }

            if (ultimoRegistro.length > 0) {
                const ultimoId = ultimoRegistro[0].idCategoria
                const nuevoId = ultimoId + 1
                codigo = `${categoria.codigoSubCategoria}_${nuevoId.toString().padStart(4, '0')}`
            } else {
                codigo = `${categoria.codigoSubCategoria}_0001`
            }

            const exist = await queryRunner.manager.findOne(SubCategoria, {
                where: { codigoSubCategoria: codigo }
            })

            if (exist) {
                throw new BadRequestException(
                    'La subactegoria ya se encuentra registrada'
                )
            }

            const newSubCat = queryRunner.manager.create(SubCategoria, {
                ...subCategoria,
                codigoSubCategoria: codigo
            })
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