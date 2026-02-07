import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Ordenes } from "../entities/Ordenes.entity";
import { ordenDTO } from "../dtos/orden.dto";
import { DetalleSalida } from "../entities/DetalleOrden.entity";
import { EstadoOrden } from "../entities/EstadoOrden.entity";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { InventarioProducto } from "src/modules/inventario/entities/InventarioProducto.entity";
import { TipoEstados } from "src/modules/catalog/entities/TipoEstados.entity";
import { SolicitudesTraslado } from '../../movimientos/entities/SolicitudesTraslado.entity';
import { TipoOrdenes } from "../entities/TipoOrden.entity";
import { tipoCompDTO } from "src/modules/productos/dtos/tipoInfo.dto";

@Injectable()
export class OrdenesServices {
    constructor(
        @Inject('ORDENES_PROVIDE')
        private ordenesRepository: Repository<Ordenes>,

        @Inject('ESTADOS_PROVIDE')
        private estadoOrdenes: Repository<Estados>,

        @Inject('DETALLE_ORDEN_PROVIDE')
        private detalleOrdenRepository: Repository<DetalleSalida>,

        @Inject('TIPO_ORDEN_PROVIDE')
        private tipoOrden: Repository<TipoOrdenes>,

        @Inject('TIPO_ESTADO_PROVIDE')
        private tipoEstado: Repository<TipoEstados>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findTipoOrden(): Promise<TipoOrdenes[]> {
        return (await this.tipoOrden.find())
    }

    async createTipoOrden(tipo: tipoCompDTO) {
        const exist = await this.tipoOrden.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de ordem'
            )
        }

        try {
            const newTipoAlm = this.tipoOrden.create(tipo)
            await this.tipoOrden.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Orden creado exitosamente'
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

    async findAllOrdenes() {
        return (await this.ordenesRepository.find())
    }

    async findOrdenBy(id: number) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const ordenFound = await this.ordenesRepository.find({
                where: { idOrden: id },
                relations: [
                    'estadoOrden',
                    'estadoOrden.estados',
                    'detalleOrdens',
                    'detalleOrdens.producto',
                ]
            })

            if (ordenFound.length === 0) {
                throw new BadRequestException(
                    'No se encontro la orden solicitada'
                )
            }

            const estadoActual = ordenFound[0].estadoOrden.sort((a, b) => 
                b.fechaRegistro.getTime() - a.fechaRegistro.getTime()
            )[0];

            ordenFound[0].estadoOrden = [estadoActual];

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Orden cargada',
                data: ordenFound
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al obtener los detalles de la orden: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    async createOrden(orden: ordenDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        const exist = await queryRunner.manager.findOne(Ordenes, {
            where: { codigoOrden: orden.codigoOrden }
        })

        if (exist) {
            throw new BadRequestException(
                'El codigo de la orden ya se encuentra registrado'
            )
        }

        if (!orden.idSolicitud) {
            throw new BadRequestException(
                'El idSolicitud es obligatorio'
            )
        }

        const existOrdenForSolicitud = await queryRunner.manager.findOne(Ordenes, {
            where: { idSolicitud: orden.idSolicitud }
        })

        if (existOrdenForSolicitud) {
            throw new BadRequestException(
                'Ya existe una orden para esta solicitud'
            )
        }

        try {
            const verifyStatusSolicitud = await queryRunner.manager.findOne(SolicitudesTraslado, {
                where: { idSolicitud: orden.idSolicitud },
                relations: [
                    'estadoSolicitud',
                    'estadoSolicitud.estados'
                ]
            })

            if (!verifyStatusSolicitud) {
                throw new BadRequestException(
                    'La solicitud no existe'
                )
            }

            const estadoActual = verifyStatusSolicitud.estadoSolicitud.sort((a, b) =>
                b.fechaRegistro.getTime() - a.fechaRegistro.getTime()
            )[0];

            verifyStatusSolicitud.estadoSolicitud = [estadoActual];

            if (verifyStatusSolicitud.estadoSolicitud[0].estados.codigoEstado !== 'ESOL_0003') {
                throw new BadRequestException(
                    'La solicitud debe estar en estado "AUTORIZADA" para crear una orden'
                )
            }

            for (const prod of orden.detalleOrden) {
                const inventario = await queryRunner.manager.findOne(InventarioProducto, {
                    where: { idProducto: prod.idProducto },
                    relations: [
                        'producto',
                        'inventario'
                    ]
                })

                if (inventario) {
                    if (inventario?.stock < prod.cantidad) {
                        throw new BadRequestException(
                            `No hay suficiente stock para ${inventario.producto.nombreProducto}`
                        )
                    }
                }
            }

            const newOrden = queryRunner.manager.create(Ordenes, orden)
            const savedOrden = await queryRunner.manager.save(Ordenes, newOrden)

            const estadoGenerada = await this.estadoOrdenes.findOne({
                where: { codigoEstado: 'ETORD_0001' }
            })

            const nuevoEstadoOrden = queryRunner.manager.create(EstadoOrden, {
                observaciones: 'Se ha generado una nueva orden',
                usuarioRegistro: savedOrden.usuarioRegistro,
                idOrden: savedOrden.idOrden,
                idEstado: estadoGenerada?.idEstado
            })

            await queryRunner.manager.save(EstadoOrden, nuevoEstadoOrden)

            for (const detOrden of orden.detalleOrden) {
                const newDet = queryRunner.manager.create(DetalleSalida, {
                    ...detOrden,
                    idOrden: savedOrden.idOrden,
                })

                await queryRunner.manager.save(DetalleSalida, newDet)
            }

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Orden registrada exitosamente'
            }

        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al crear la orden: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    async getCodigoRecomendado(): Promise<string> {

        const ultimoRegistro = await this.ordenesRepository.find({
            order: {
                idOrden: 'DESC'
            },
            take: 1
        })

        if(ultimoRegistro.length > 0) {
            const ultimoID = ultimoRegistro[0].idOrden + 1;
            return `ORD_${ultimoID.toString().padStart(4, '0')}`;
        }

        return `ORD_0001`;
    }

    async revisarOrden(idOrden: number, usuario: string) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const ordenFound = await this.ordenesRepository.findOne({
                where: { idOrden: idOrden },
                relations: [
                    'estadoOrden',
                    'estadoOrden.estados'
                ]
            })
            if (!ordenFound) {
                throw new BadRequestException(
                    'No se encontró la orden solicitada'
                )
            }
            const estado = ordenFound.estadoOrden.sort((a, b) =>
                b.fechaRegistro.getTime() - a.fechaRegistro.getTime()
            )[0];

            if (estado) {
                if (estado.estados.codigoEstado === 'ETORD_0001' /* GENERADA */) {
                    const estadoRevisada = await this.estadoOrdenes.findOne({
                        where: { codigoEstado: 'ETORD_0002' } // REVISADA
                    })
                    if (!estadoRevisada) {
                        throw new BadRequestException(
                            'No se encontró el estado para revisar la orden'
                        )
                    }
                    const nuevoEstadoOrden = queryRunner.manager.create(EstadoOrden, {
                        observaciones: `La orden ha sido revisada por el usuario ${usuario}`,
                        usuarioRegistro: usuario,
                        idOrden: ordenFound.idOrden,
                        idEstado: estadoRevisada.idEstado
                    })
                    await queryRunner.manager.save(EstadoOrden, nuevoEstadoOrden)

                    await queryRunner.commitTransaction()
                    return {
                        code: 200,
                        msg: 'Orden revisada exitosamente',
                    }
                } else if (estado?.estados.codigoEstado === 'ETORD_0002' /* REVISADA */) {
                    throw new BadRequestException(
                        'La orden ya ha sido revisada anteriormente'
                    )
                } else {
                    throw new BadRequestException(
                        'La orden no se encuentra en un estado válido para ser revisada'
                    )
                }
            } else {
                throw new BadRequestException(
                    'No se encontró el estado de la orden'
                )
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al revisar la orden: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    async autorizarOrden(idOrden: number, usuario: string) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const ordenFound = await this.ordenesRepository.findOne({
                where: { idOrden: idOrden },
                relations: [
                    'estadoOrden',
                    'estadoOrden.estados'
                ]
            })

            if (!ordenFound) {
                throw new BadRequestException(
                    'No se encontró la orden solicitada'
                )
            } else {
                const estadoOrden = await queryRunner.manager.find(EstadoOrden, {
                    order: { idEstadoOrden: 'DESC' },
                    where: { idOrden: ordenFound.idOrden },
                    take: 1,
                    relations: ['estados']
                })

                if (estadoOrden.length > 0) {
                    const estado = estadoOrden[0];

                    if (estado.estados.codigoEstado == 'ETORD_0002') {
                        const estadoAutorizada = await this.estadoOrdenes.findOne({
                            where: { codigoEstado: 'ETORD_0003' } // AUTORIZADA
                        })

                        const nuevoEstadoOrden = queryRunner.manager.create(EstadoOrden, {
                            observaciones: `La orden ha sido autorizada por el usuario ${usuario}`,
                            usuarioRegistro: usuario,
                            idOrden: ordenFound.idOrden,
                            idEstado: estadoAutorizada?.idEstado
                        })

                        await queryRunner.manager.save(EstadoOrden, nuevoEstadoOrden)

                        await queryRunner.commitTransaction()
                        return {
                            code: 200,
                            msg: 'Orden autorizada exitosamente',
                        }
                    } else if (estado.estados.codigoEstado == 'ETORD_0003') {
                        throw new BadRequestException(
                            'La orden ya ha sido autorizada anteriormente'
                        )
                    }
                }
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al autorizar la orden: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }

    // ORDENES DE ENTRADA DE PRODUCTO
    // async findAllOrdenesEntrada(): Promise<OrdenesEntrada[]> {
    //     return (await this.ordenesEntrda.find())
    // }

    // async getCodigoOrdEnt(): Promise<string> {
    //     const codeEstado = await this.tipoEstado.findOneBy({
    //         codigoTipoEstado: 'TE-003'
    //     })

    //     const ultimoRegistro = await this.ordenesEntrda.find({
    //         order: {
    //             idOrdenEntrada: 'DESC'
    //         },
    //         take: 1
    //     })

    //     if(codeEstado) {
    //         if(ultimoRegistro.length > 0) {
    //             const ultimoID = ultimoRegistro[0].idOrdenEntrada + 1;
    //             return `${codeEstado.codigoEstados}_${ultimoID.toString().padStart(4, '0')}`;
    //         }

    //         return `${codeEstado.codigoEstados}_0001`;
    //     } else {
    //         throw new BadRequestException(
    //             'No se encontró la configuración de código para órdenes'
    //         );
    //     }
    // }
}