import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { EstadosServices } from "../services/estados.service";

@Controller('/estados')
@ApiTags('Estados')
export class EstadosController {
    constructor(
        private readonly estadosServices: EstadosServices,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los estados' })
    async findAll() {
        const prods = await this.estadosServices.findAll()
        return {
            code: 200,
            msg: 'Estados Cargados',
            data: prods
        }
    }

    @Get('/tipoEstados')
    @ApiOperation({ summary: 'Obtener todos los estados' })
    async findAllTipoEstados() {
        const prods = await this.estadosServices.findAllTipoEstados()
        return {
            code: 200,
            msg: 'Estados Cargados',
            data: prods
        }
    }
}