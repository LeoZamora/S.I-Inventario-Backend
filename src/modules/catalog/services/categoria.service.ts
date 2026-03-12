import { Injectable, Inject, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Categoria } from "../entities/Categoria.entity";
import { SubCategoria } from "../entities/SubCategoria.entity";
import { categoriaDTO } from "../dtos/categorias.dto";
import { Producto } from "src/modules/productos/entities/Producto.entity";


@Injectable()
export class CategoriaServices {
    constructor(
        @Inject('CATEGORIA_PROVIDE')
        private categoriaRepository: Repository<Categoria>,

        @Inject('PRODUCTO_PROVIDE')
        private productoRepository: Repository<Producto>,

        @Inject('SUBCATEGORIA_PROVIDE')
        private subCategoriaRepository: Repository<SubCategoria>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async finAllSubCategoria(): Promise<SubCategoria[]> {
        return (await this.subCategoriaRepository.find())
    }

    async finSubCategoryByCategory(id: number) {
        return (await this.subCategoriaRepository.find({
            where: { idCategoria: id },
            relations: [
                'categoria'
            ]
        }))
    }

    async findAllCategoria(): Promise<Categoria[]> {
        return (await this.categoriaRepository.find({
            relations: [
                'subCategorias'
            ]
        }))
    }

    async findCategoryById(id: number) {
        return (await this.categoriaRepository.findOne({
            where: {
                idCategoria: id
            },
            relations: [
                'subCategorias'
            ],
            order: { idCategoria: "DESC" }
        }))
    }

    async findSubCategoryById(id: number) {
        return (await this.subCategoriaRepository.findOne({
            where: {
                idSubCategoria: id
            },
            relations: [],
            order: { idSubCategoria: "DESC" }
        }))
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


    async createSubCategoria(subCategoria: Partial<SubCategoria>) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const exist = await queryRunner.manager.findOne(SubCategoria, {
                where: { codigoSubCategoria: subCategoria.codigoSubCategoria }
            })

            if (exist) {
                throw new BadRequestException(
                    'La subactegoria ya se encuentra registrada'
                )
            }

            const newSubCat = queryRunner.manager.create(SubCategoria, {
                ...subCategoria,
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

    async editSubCategoria(id: number, updateSubCat: Partial<SubCategoria>) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const subCat = await queryRunner.manager.findOne(SubCategoria, {
                where: { idSubCategoria: id }
            })

            if (!subCat) {
                throw new NotFoundException ('La subcategoria  no existe')
            }

            const productos = await queryRunner.manager.find(Producto, {
                where: { idSubCategoria: subCat.idSubCategoria },
                order: { idProducto: 'DESC' }
            })

            if (productos.length > 0) {
                for (const prod of productos) {
                    const [code, num] = prod.codigoProducto.split("_")

                    if (updateSubCat.codigoProducto) {
                        if (updateSubCat.codigoProducto !== code) {
                            throw new Error("Ya existen productos registrados con este codigo de productos.")
                        }
                    }
                }
            }

            const updateData = queryRunner.manager.merge(SubCategoria, subCat, updateSubCat)
            await queryRunner.manager.save(updateData)

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'SubCategoria actualizada con éxito',
            };
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

    async getCodigoSubCategoria(id: number) {
        let codigo: string;
        const categoria = await this.categoriaRepository.findOne({
            where: { idCategoria: id }
        })

        if (!categoria) {
            throw new BadRequestException(
                'Categoria no ha sido encontrada'
            )
        }

        const ultimoRegistro = await this.subCategoriaRepository.find({
            where: { idCategoria: categoria?.idCategoria },
            order: {
                idSubCategoria: "DESC"
            },
            take: 1
        })

        if (ultimoRegistro.length > 0) {
            const [code, num] = ultimoRegistro[0].codigoSubCategoria.split("_")
            const next = (parseInt(num, 10) + 1).toString().padStart(num.length, "0")
            codigo = `${code}_${next}`;
        } else {
            codigo = `${categoria.codigoSubCategoria}_0001`
        }

        return codigo
    }
}