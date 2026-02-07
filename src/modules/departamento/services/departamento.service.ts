import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Departamento } from "../entities/Departamento.entity";
import { DataSource, Repository } from "typeorm";
import { departamentoDTO } from "../dtos/departamento.dto";
import { EstadoDepartamento } from "../entities/EstadoDepartamento.entity";
import { Estados } from "src/modules/catalog/entities/Estados.entity";

@Injectable()
export class DepartamentoServices {
    constructor(
        @Inject('DEPTO_PROVIDE')
        private departamentoRepository: Repository<Departamento>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ){}

    async findAllDepartametos(): Promise<Departamento[]> {
        return (await this.departamentoRepository.find())
    }

    async createDepartamento(departamento: departamentoDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const exist = await this.departamentoRepository.findOne({
                where: { codigoDepartamento: departamento.codigoDepartamento }
            })

            if (exist) {
                throw new BadRequestException(
                    `Ya existe un departamento con este codigo`
                )
            }

            const nuevoDepto = queryRunner.manager.create(Departamento, departamento)
            const deptodSaved = await queryRunner.manager.save(Departamento, nuevoDepto)

            const estado = await queryRunner.manager.findOne(Estados, {
                where: { codigoEstado: 'DEPTO-001' }
            })

            if (estado) {
                const newEstadoDepartamento = queryRunner.manager.create(EstadoDepartamento, {
                    observaciones: `Se ha creado un un nuevo departamento con codigo ${deptodSaved.codigoDepartamento}`,
                    usuarioRegistro: departamento.usuarioRegistro,
                    idEstado: estado.idEstado,
                    idDepartamento: deptodSaved.idDepartamento
                })

                await queryRunner.manager.save(EstadoDepartamento, newEstadoDepartamento)
            }

            await queryRunner.commitTransaction()

            return {
                code: 200,
                msg: 'Departamento creado exitosamente'
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el departamento: ${error.message}`
            );
        } finally {
            await queryRunner.release()
        }
    }
}