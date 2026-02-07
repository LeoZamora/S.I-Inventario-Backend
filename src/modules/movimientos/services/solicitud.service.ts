import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SolicitudesTraslado } from "src/modules/movimientos/entities/SolicitudesTraslado.entity";
import { EstadosSolicitud } from '../entities/EstadoSolicitud.entity';
import { Estados } from "src/modules/catalog/entities/Estados.entity";
import { DetalleSolicitud } from "../entities/DetalleSolicitud.entity";
import { solicitudDTO } from "../dtos/solicitud.dto";
import { TipoEstados } from "src/modules/catalog/entities/TipoEstados.entity";
import { TipoSolicitud } from "../entities/TipoSolicitud.entity";
import { tipoCompDTO } from "src/modules/productos/dtos/tipoInfo.dto";

@Injectable()
export class SolicitudService {
    constructor(
        @Inject('SOLICITUD_TRASLADO_PROVIDE')
        private solicitudTraslado: Repository<SolicitudesTraslado>,

        @Inject('ESTADO_SOLICITUD_PROVIDE')
        private estadoSolicitud: Repository<EstadosSolicitud>,

        @Inject('TIPO_ESTADO_PROVIDE')
        private tipoEstado: Repository<TipoEstados>,

        @Inject('TIPO_SOLICITUD_PROVIDE')
        private tipoSolicitud: Repository<TipoSolicitud>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}

    async findAllSolicitudes(): Promise<SolicitudesTraslado[]> {
        try {
            return (await this.solicitudTraslado.find());
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Error al obtener las solicitudes: ${error.message}`
            );
        }
    }

    async findSolicitudBy(id: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        if (!id) {
            throw new BadRequestException('El ID de la solicitud es obligatorio');
        }

        try {
            const solicitudFound = await queryRunner.manager.findOne(SolicitudesTraslado, {
                where: { idSolicitud: id },
                relations: [
                    'bodegaSolicitante',
                    'bodegaSolicitada',
                    'estadoSolicitud',
                    'detalleSolicitud',
                    'detalleSolicitud.producto',
                    'estadoSolicitud.estados',
                ]
            })

            if (!solicitudFound) {
                throw new BadRequestException(
                    'No se encontro la solicitud solicitada'
                );
            }

            const estadoActual = solicitudFound.estadoSolicitud.sort((a, b) =>
                b.fechaRegistro.getTime() - a.fechaRegistro.getTime()
            )[0];

            solicitudFound.estadoSolicitud = [estadoActual];

            await queryRunner.commitTransaction();

            return {
                code: 200,
                msg: 'Solicitud encontrada exitosamente',
                data: solicitudFound,
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al obtener la solicitud: ${error.message}`
            );
        }  finally {
            await queryRunner.release();
        }
    }

    async createSolicitud(solicitudData: solicitudDTO) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const exist = await this.solicitudTraslado.findOne({
                where: {
                    codigoSolicitud: solicitudData.codigoSolicitud
                }
            });

            if (exist) {
                throw new BadRequestException('Ya existe una solicitud con ese código');
            }

            const nuevaSolicitud = queryRunner.manager.create(SolicitudesTraslado, {
                codigoSolicitud: solicitudData.codigoSolicitud,
                solicitante: solicitudData.solicitante,
                observaciones: solicitudData.observaciones,
                motivo: solicitudData.motivo,
                usuarioRegistro: solicitudData.usuarioRegistro,
                idBodegaSolicitante: solicitudData.idBodegaSolicitante,
                idBodegaSolicitada: solicitudData.idBodegaSolicitada,
                idTipoSolicitud: solicitudData.idTipoSolicitud,
            });
            const solictudSaved = await queryRunner.manager.save(SolicitudesTraslado, nuevaSolicitud);

            const estadoInicial = await queryRunner.manager.findOneBy(Estados, {
                codigoEstado: 'ESOL_0001' // Código para "GENERADA",
            })

            if (solicitudData.detalles.length > 0) {
                for(const det of solicitudData.detalles) {

                    const newDetails = queryRunner.manager.create(DetalleSolicitud, {
                        observaciones: det.observaciones,
                        precioUnitario: det.precioUnitario,
                        cantidad: det.cantidad,
                        idProducto: det.idProducto,
                        idSolicitud: solictudSaved.idSolicitud,
                    })

                    await queryRunner.manager.save(DetalleSolicitud, newDetails)
                }
            }


            if (estadoInicial) {
                const nuevoEstadoSolicitud = queryRunner.manager.create(EstadosSolicitud, {
                    observaciones: `Nueva solicitud generada con código ${solictudSaved.codigoSolicitud}`,
                    idSolicitud: solictudSaved.idSolicitud,
                    idEstado: estadoInicial.idEstado,
                    usuarioRegistro: solicitudData.usuarioRegistro,
                });

                await queryRunner.manager.save(EstadosSolicitud, nuevoEstadoSolicitud);
            } else {
                throw new BadRequestException('No se encontró el estado inicial para la solicitud');
            }

            await queryRunner.commitTransaction();
            return {
                code: 200,
                msg: 'Solicitud de traslado creada exitosamente',
            };

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        } finally {
            await queryRunner.release();
        }
    }

    async getCodigoRecomendado(): Promise<string> {
        const ultimoRegistro = await this.solicitudTraslado.find({
            order: {
                idSolicitud: 'DESC'
            },
            take: 1
        });

        if (ultimoRegistro.length > 0) {
            const ultimoId = ultimoRegistro[0].idSolicitud;
            const nuevoId = ultimoId + 1;
            return `SOL_${nuevoId.toString().padStart(4, '0')}`;
        }

        return `SOL_0001`;
    }

    async findTipoSolicitud(): Promise<TipoSolicitud[]> {
        return (await this.tipoSolicitud.find())
    }

    async createTipoSolicitud(tipo: tipoCompDTO) {
        const exist = await this.tipoSolicitud.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de solicitud'
            )
        }

        try {
            const newTipoSolicitud = this.tipoSolicitud.create(tipo)
            await this.tipoSolicitud.save(newTipoSolicitud)

            return {
                code: 200,
                msg: 'Tipo de Solicitud creado exitosamente'
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


    // FLUJO DE SOLICITUDES
    async revisarSolicitud(idSolicitud: number, usuario: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const solicitud = await queryRunner.manager.findOne(SolicitudesTraslado, {
                where: { idSolicitud: idSolicitud },
                relations: ['estadoSolicitud', 'detalleSolicitud']
            })

            if (!solicitud) {
                throw new BadRequestException(
                    'No se encontró la solicitud solicitada'
                )
            } else {
                const estadoSolicitud = await queryRunner.manager.find(EstadosSolicitud, {
                    order: { idEstadoSolicitud: 'DESC' },
                    where: { idSolicitud: idSolicitud },
                    take: 1
                })

                if (estadoSolicitud.length > 0) {
                    const estado = await queryRunner.manager.findOne(Estados, {
                        where: { idEstado: estadoSolicitud[0].idEstado }
                    })

                    if (estado?.codigoEstado === 'ESOL_0001' /* GENERADA */) {
                        const estadoRevisado = await queryRunner.manager.findOne(Estados, {
                            where: { codigoEstado: 'ESOL_0002' /* REVISADA */ }
                        })

                        const nuevoEstadoSolicitud = queryRunner.manager.create(EstadosSolicitud, {
                            observaciones: `Solicitud revisada por el usuario ${usuario}`,
                            idSolicitud: solicitud.idSolicitud,
                            idEstado: estadoRevisado?.idEstado,
                            usuarioRegistro: usuario,
                        });

                        await queryRunner.manager.save(EstadosSolicitud, nuevoEstadoSolicitud)

                        await queryRunner.commitTransaction();

                        return {
                            code: 200,
                            msg: 'Solicitud revisada exitosamente',
                        }
                    } else if (estado?.codigoEstado === 'ESOL_0002' /* REVISADA */) {
                        throw new BadRequestException(
                            'La solicitud ya ha sido revisada anteriormente'
                        )
                    } else if (estado?.codigoEstado === 'ESOL_0003' /* APROBADA */) {
                        throw new BadRequestException(
                            'La solicitud ya ha sido aprobada, no se puede revisar de nuevo'
                        )
                    }
                }
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al procesar la solicitud: ${error.message}`
            );
        }
    }

    async autorizarSolicitud(idSolicitud: number, usuario: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const solicitud = await queryRunner.manager.findOne(SolicitudesTraslado, {
                where: { idSolicitud: idSolicitud },
                relations: ['estadoSolicitud', 'detalleSolicitud']
            })

            if (!solicitud) {
                throw new BadRequestException(
                    'No se encontró la solicitud solicitada'
                )
            } else {
                const estadoSolicitud = await queryRunner.manager.find(EstadosSolicitud, {
                    order: { idEstadoSolicitud: 'DESC' },
                    where: { idSolicitud: idSolicitud },
                    take: 1
                })

                if (estadoSolicitud.length > 0) {
                    const estado = await queryRunner.manager.findOne(Estados, {
                        where: { idEstado: estadoSolicitud[0].idEstado }
                    })

                    if (estado?.codigoEstado === 'ESOL_0002' /* REVISADA */) {
                        const estadoRevisado = await queryRunner.manager.findOne(Estados, {
                            where: { codigoEstado: 'ESOL_0003' /* AUTORIZADA */ }
                        })

                        const nuevoEstadoSolicitud = queryRunner.manager.create(EstadosSolicitud, {
                            observaciones: `Solicitud autorizada por el usuario ${usuario}`,
                            idSolicitud: solicitud.idSolicitud,
                            idEstado: estadoRevisado?.idEstado,
                            usuarioRegistro: usuario,
                        });

                        await queryRunner.manager.save(EstadosSolicitud, nuevoEstadoSolicitud)

                        await queryRunner.commitTransaction();

                        return {
                            code: 200,
                            msg: 'Solicitud autorizada exitosamente',
                        }
                    } else if (estado?.codigoEstado === 'ESOL_0001' /* GENERADA */) {
                        throw new BadRequestException(
                            'No se puede autorizar una factura que no ha sido revisada'
                        )
                    } else if (estado?.codigoEstado === 'ESOL_0003' /* AUTORIZADA */) {
                        throw new BadRequestException(
                            'La solicitud ya ha sido aprobada, no se puede aprobar de nuevo'
                        )
                    } else if (estado?.codigoEstado === 'ESOL_0004' /* RECHAZADA */) {
                        throw new BadRequestException(
                            'La solicitud ha sido rechazada, no se puede autorizar'
                        )
                    }
                } else {
                    throw new BadRequestException(
                        'No se encontró el estado de la solicitud'
                    )
                }
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al procesar la solicitud: ${error.message}`
            );
        }
    }
}