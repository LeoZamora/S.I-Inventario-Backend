import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Estados } from "../entities/Estados.entity";
import { TipoEstados } from "../entities/TipoEstados.entity";

@Injectable()
export class EstadosServices {
    constructor(
        @Inject('ESTADOS_PROVIDE')
        private estados: Repository<Estados>,

        @Inject('TIPO_ESTADO_PROVIDE')
        private tipoEstados: Repository<TipoEstados>
    ){}

    async findAll(): Promise<Estados[]> {
        return (await this.estados.find())
    }

    async findAllTipoEstados(): Promise<TipoEstados[]> {
        return (await this.tipoEstados.find())
    }
}