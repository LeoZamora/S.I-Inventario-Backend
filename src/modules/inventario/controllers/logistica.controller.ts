import { Body, Controller, Get, Post } from "@nestjs/common";
import { LogisticaServices } from "../services/logistica.service";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { bodegaDTO, ubicacionDTO } from "../dtos/logistica.dto";

@Controller('logistica')
@ApiTags('Logistica')
export class LogisticaController {
    constructor(
        private readonly logisticaServices: LogisticaServices
    ) {}

    // UBICACIONES CONTROLLERS
    @Get('/ubicacion')
    @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
    async findAllUbicaciones() {
        const ubicaciones = await this.logisticaServices.findAllUbicaciones()
        return {
            code: 200,
            msg: 'Ubicaciones cargadas',
            data: ubicaciones
        }
    }

    @Post('/ubicacion')
    @ApiOperation({ summary: 'Crear nueva ubicacion' })
    @ApiBody({
        type: ubicacionDTO
    })
    async createUbicacion(
        @Body() ubicacion: ubicacionDTO
    ) {
        return (await this.logisticaServices.createUbicacion(ubicacion))
    }

    // BODEGAS CONTROLLERS
    @Get('/bodega')
    @ApiOperation({ summary: 'Obtener todas las bodegas' })
    async findAllBodegas() {
        const bodegas = await this.logisticaServices.findAllBodegas()
        return {
            code: 200,
            msg: 'Bodegas cargadas',
            data: bodegas
        }
    }

    @Post('/bodega')
    @ApiOperation({ summary: 'Crear nueva bodega' })
    @ApiBody({
        type: bodegaDTO
    })
    async createBodega(
        @Body() bodega: bodegaDTO
    ) {
        return (await this.logisticaServices.createBodega(bodega))
    }
}