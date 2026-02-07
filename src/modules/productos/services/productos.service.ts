import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { InventarioProducto } from "src/modules/inventario/entities/InventarioProducto.entity";
import { validateTypeProd } from "src/helpers/utils";
import { Inventario } from "src/modules/inventario/entities/Inventario.entity";
import { Producto } from "../entities/Producto.entity";
import { productoDTO } from "../dtos/producto.dto";
import { DataSource, Repository } from "typeorm";
import { TipoProducto } from "../entities/TipoProducto.entity";
import { tipoCompDTO } from "../dtos/tipoInfo.dto";

@Injectable()
export class ProductosServices {
    constructor(
        @Inject('PRODUCTO_PROVIDE')
        private productoRepository: Repository<Producto>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('TIPOPROD_PROVIDE')
        private tipoProductoRepository: Repository<TipoProducto>
    ) {}

    async findAllProds(): Promise<Producto[]> {
        const productos = await this.productoRepository.find({
            // relations: [
            //     'inventarioProductos',
            //     'subCategoria.categoria',
            // ],
            // order: { idProducto: "ASC" }
        })

        return productos

        // return productos.map(producto => {
        //     return {
        //         idProducto: producto.idProducto,
        //         codigoProducto: producto.codigoProducto,
        //         nombreProducto: producto.nombreProducto,
        //         subCategoria: producto.subCategoria.nombre,
        //         idSubCategoria: producto.subCategoria.idSubCategoria,
        //         categoria: producto.subCategoria.categoria.nombreCategoria,
        //         idCategoria: producto.subCategoria.categoria.idCategoria,
        //         marca: producto.marca,
        //         modelo: producto.modelo,
        //         precio: producto.precio,
        //         stock: producto.inventarioProductos[0]?.stock,
        //         stockMin: producto.inventarioProductos[0]?.stockMin,
        //         stockMax: producto.inventarioProductos[0]?.stockMax,
        //         estado: producto.inventarioProductos[0]?.estado,
        //     }
        // });
    }

    async createProducto(producto: productoDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        const exist = await queryRunner.manager.findOne(Producto, {
            where: { codigoProducto: producto.codigoProducto }
        })

        if (exist) {
            throw new BadRequestException(
                'El código de producto ya está registrado'
            )
        }

        const existInv = await queryRunner.manager.findOne(Inventario, {
            where: { idInventario: producto.idInventario }
        })

        if (!existInv) {
            throw new BadRequestException(
                'El inventario no existe o no esta siendo referenciado'
            )
        }

        try {
            const newProducto = queryRunner.manager.create(Producto, {
                codigoProducto: producto.codigoProducto,
                nombreProducto: producto.nombreProducto,
                marca: producto.marca,
                modelo: producto.modelo,
                observaciones: producto.observaciones,
                caracteristicasEspeciales: producto.caracteristicasEspeciales,
                precio: producto.precio,
                usuarioRegistro: producto.usuarioRegistro,
                idSubCategoria: producto.idSubCategoria,
                idTipoProducto: producto.idTipoProducto,
            })

            const productoSaved = await queryRunner.manager.save(Producto, newProducto)

            await validateTypeProd(
                producto.detallesEspecificos,
                productoSaved.idProducto,
                queryRunner
            )

            const newInventarioProd = queryRunner.manager.create(InventarioProducto, {
                stock: producto.stock,
                stockMin: producto.stockMin,
                stockMax: producto.stockMax,
                idInventario: producto.idInventario,
                idProducto: productoSaved.idProducto,
                usuarioRegistro: productoSaved.usuarioRegistro
            })


            await queryRunner.manager.save(InventarioProducto, newInventarioProd)
            await queryRunner.commitTransaction();

            return {
                code: 200,
                msg: 'Producto creado exitosamente'
            }

        } catch (error) {
            await queryRunner.rollbackTransaction();

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al crear producto: ${error.message}`
            );
        } finally {
            await queryRunner.release();
        }
    }

    async getCodigoRecomendado(): Promise<string> {
        const ultimoRegistro = await this.productoRepository.find({
            order: {
                idProducto: 'DESC'
            },
            take: 1
        });

        if (ultimoRegistro.length > 0) {
            const ultimoId = ultimoRegistro[0].idProducto;
            const nuevoId = ultimoId + 1;
            return `PROD_${nuevoId.toString().padStart(4, '0')}`;
        }

        return `PROD_0001`;
    }


    async findTipoProducto(): Promise<TipoProducto[]> {
        return (await this.tipoProductoRepository.find())
    }

    async createTipoProducto(tipo: tipoCompDTO) {
        const exist = await this.tipoProductoRepository.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de producto'
            )
        }

        try {
            const newTipoAlm = this.tipoProductoRepository.create(tipo)
            await this.tipoProductoRepository.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de producto creado exitosamente'
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