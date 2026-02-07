import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { EstadosServices } from "../services/estados.service";
import { estadoDTO, tipoEstadoDTO } from "../dtos/estados.dto";

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

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo estado' })
    @ApiBody({
        type: estadoDTO
    })
    async createEstado(
        @Body() estadoData: estadoDTO
    ) {
        return await this.estadosServices.createEstado(estadoData)
    }

    @Get('/codigo-recomendado/:idTipoEstado')
    @ApiOperation({ summary: 'Obtener un código recomendado para un nuevo estado' })
    async getCodigoRecomendado(
        @Param('idTipoEstado') idTipoEstado: number
    ) {
        return (await this.estadosServices.getCodigoRecomendado(idTipoEstado));
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

    @Post('/tipoEstado')
    @ApiOperation({ summary: 'Crear un nuevo tipo de estado' })
    @ApiBody({
        type: tipoEstadoDTO
    })
    async createTipoEstado(
        @Body() tipoEstadoData: tipoEstadoDTO
    ) {
        return await this.estadosServices.createTipoEstado(tipoEstadoData)
    }
}