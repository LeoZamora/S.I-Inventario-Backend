import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { OrdenesSalida } from "../entities/OrdenesSalida.entity";
import { ordenSalidaDTO } from "../dtos/orden.dto";
import { DetalleSalida } from "../entities/DetalleOrden.entity";
import { EstadoOrden } from "../entities/EstadoOrden.entity";
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { EquiposComputo } from "src/modules/productos/entities/EquiposComputo.entity";
import { InventarioProducto } from "src/modules/inventario/entities/InventarioProducto.entity";

@Injectable()
export class OrdenesServices {
    constructor(
        @Inject('ORDENES_PROVIDE')
        private ordenesRepository: Repository<OrdenesSalida>,

        @Inject('ESTADOS_PROVIDE')
        private estadoOrdenes: Repository<Estados>,

        @Inject('DETALLE_ORDEN_PROVIDE')
        private detalleOrdenRepository: Repository<DetalleSalida>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findAllOrdenes() {
        try {
            return (await this.ordenesRepository.find())
        } catch (error) {
            console.log(error);
        }
    }

    async findOrdenBy(id: number) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const ordenFound = await this.ordenesRepository.find({
                where: { idOrdenSalida: id },
                relations: [
                    'estadoOrden',
                    'estadoOrden.estados'
                ]
            })

            if (ordenFound.length === 0) {
                throw new BadRequestException(
                    'No se encontro la orden solicitada'
                )
            }

            const detalles = await this.detalleOrdenRepository.find({
                where: { idOrdenSalida: id },
                relations: [
                    'producto',
                    'producto.equiposComputos',
                ],
            })

            const detallesFormateados = detalles.map(item => ({
                idDetalleOrden: item.idDetalleOrden,
                cantidad: item.cantidad,
                observaciones: item.observaciones,
                precioUnitario: item.precioUnitario,
                idProducto: item.idProducto,
                idOrdenSalida: item.idOrdenSalida,
                producto: item.producto?.nombreProducto,
            }))

            const orden = {
                idOrdenSalida: ordenFound[0].idOrdenSalida,
                codigoOrden: ordenFound[0].codigoOrden,
                observaciones: ordenFound[0].observaciones,
                idSolicitud: ordenFound[0].idSolicitud,
                fechaEmision: ordenFound[0].fechaEmision,
                usuarioRegistro: ordenFound[0].usuarioRegistro,
                fechaRegistro: ordenFound[0].fechaRegistro,
                estado: ordenFound[0].estadoOrden[0].estados.nombreEstado
            }

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Orden cargada',
                data: {
                    ...orden,
                    detalles: detallesFormateados
                }
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

    async createOrden(orden: ordenSalidaDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        const exist = await queryRunner.manager.findOne(OrdenesSalida, {
            where: { codigoOrden: orden.codigoOrden }
        })

        if (exist) {
            throw new BadRequestException(
                'El codigo de la orden ya se encuentra registrado'
            )
        }

        try {
            for (const prod of orden.detalleOrden) {

                const inventario = await queryRunner.manager.findOne(InventarioProducto, {
                    where: { idProducto: prod.idProducto },
                    relations: [
                        'producto',
                        'inventario'
                    ]
                },)

                if (inventario) {
                    if (inventario?.stock < prod.cantidad) {
                        throw new BadRequestException(
                            `No hay suficiente stock para ${inventario.producto.nombreProducto}`
                        )
                    }
                }
            }

            const newOrden = queryRunner.manager.create(OrdenesSalida, orden)
            const savedOrden = await queryRunner.manager.save(OrdenesSalida, newOrden)

            const estadoGenerada = await this.estadoOrdenes.findOne({
                where: { nombreEstado: 'GENERADA' }
            })

            const nuevoEstadoOrden = queryRunner.manager.create(EstadoOrden, {
                observaciones: 'Se ha generado una nueva orden',
                usuarioRegistro: savedOrden.usuarioRegistro,
                idOrdenSalida: savedOrden.idOrdenSalida,
                idEstado: estadoGenerada?.idEstado
            })

            await queryRunner.manager.save(EstadoOrden, nuevoEstadoOrden)

            for (const detOrden of orden.detalleOrden) {
                const newDet = queryRunner.manager.create(DetalleSalida, {
                    ...detOrden,
                    idOrdenSalida: savedOrden.idOrdenSalida,
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
}