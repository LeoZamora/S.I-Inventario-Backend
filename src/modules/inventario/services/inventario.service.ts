import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Inventario } from "../entities/Inventario.entity";
import { DataSource, Repository } from "typeorm";
import { inventarioDTO } from "../dtos/inventario.dto";
import { BadRequestException } from "@nestjs/common";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { EstadoInventario } from "../entities/EstadoInventario.entity";
import { TipoEstados } from "src/modules/catalog/entities/TipoEstados.entity";
import { InventarioProducto } from "../entities/InventarioProducto.entity";

@Injectable()
export class InventarioServices {
    constructor(
        @Inject('INVENTARIO_PROVIDE')
        private inventarioReposity: Repository<Inventario>,

        @Inject('TIPO_ESTADO_PROVIDE')
        private tipoEstados: Repository<TipoEstados>,

        @Inject('INVENTARIOPROD_PROVIDE')
        private inventProd: Repository<InventarioProducto>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findAll(): Promise<Inventario[]>{
        return (await this.inventarioReposity.find())
    }

    async findInventarioProducto() {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const inventarioProd = await queryRunner.manager.find(InventarioProducto, {
                relations: [
                    'inventario',
                    'producto',
                    'producto.subCategoria',
                    'producto.tipoProducto',
                    'producto.subCategoria.categoria',
                ]
            })

            const produMap = inventarioProd.map(item => {
                return {
                    idProducto: item.idProducto,
                    codigoProducto: item.producto.codigoProducto,
                    nombreProducto: item.producto.nombreProducto,
                    inventario: item.inventario.nombreInventario,
                    subCategoria: item.producto.subCategoria.nombre,
                    categoria: item.producto.subCategoria.categoria.nombreCategoria,
                    tipoProducto: item.producto.tipoProducto.nombre,
                    precio: item.producto.precio,
                    stockMin: item.stockMin,
                    stockMax: item.stockMax,
                    stock: item.stock,
                    estado: item.estado,
                    fechaRegistro: item.producto.fechaRegistro,
                    usuarioRegistro: item.producto.usuarioRegistro,
                }
            })

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Inventario cargado',
                data: produMap
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el inventario: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
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

            const inventarioSaved = await queryRunner.manager.save(newInventario)

            const estado = await queryRunner.manager.findOneBy(Estados, {
                codigoEstado: 'ETINV_0001'
            })

            if (estado) {
                const nuevoEstadoInv = queryRunner.manager.create(EstadoInventario, {
                    observaciones: `Se ha creado un nuevo inventario con codigo ${inventarioSaved.codigoInventario}`,
                    usuarioRegistro: inventario.usuarioRegistro,
                    idEstado: estado.idEstado,
                    idInventario: inventarioSaved.idInventario
                })

                await queryRunner.manager.save(EstadoInventario, nuevoEstadoInv)
            } else {
                throw new BadRequestException(
                    `Error al asignarle el estado al nuevo inventario`
                )
            }

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
                `Error al crear el inventario: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    async getCodigoRecomendado(): Promise<string> {
        const codeEstados = await this.tipoEstados.findOneBy({
            codigoTipoEstado: 'TE-001' // Código para "TIPO DE ESTADO SOLICITUD"
        })

        const ultimoRegistro = await this.inventarioReposity.find({
            order: {
                idInventario: 'DESC'
            },
            take: 1
        });

        if (codeEstados) {
            if (ultimoRegistro.length > 0) {
                const ultimoId = ultimoRegistro[0].idInventario;
                const nuevoId = ultimoId + 1;
                return `INV_${nuevoId.toString().padStart(4, '0')}`;
            }

            return `INV_0001`;
        } else {
            throw new BadRequestException(
                'No se encontró la configuración de código para solicitudes'
            );
        }
    }
}