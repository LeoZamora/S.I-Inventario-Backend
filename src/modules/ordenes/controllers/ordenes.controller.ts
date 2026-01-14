import { Body, Controller, Get, Post, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiBody } from "@nestjs/swagger";
import { OrdenesServices } from "../services/ordenes.service";
import { ordenSalidaDTO } from "../dtos/orden.dto";

@Controller('ordenes')
@ApiTags('OrdenesSalida')
export class OrdenesController {
    constructor(
        private readonly ordenesServices: OrdenesServices
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las ordenes registradas' })
    async finAllOrdenes () {
        const ordenes = await this.ordenesServices.findAllOrdenes()

        return {
            code: 200,
            msg: 'OrdenesSalida cargadas',
            data: ordenes
        }
    }

    @Get(':idOrdenSalida')
    @ApiOperation({ summary: 'Obtener orden por id' })
    async finOrdenBy (
        @Param('idOrdenSalida', ParseIntPipe) idOrdenSalida: number
    ) {
        return await this.ordenesServices.findOrdenBy(idOrdenSalida)
    }

    @Post()
    @ApiOperation({ summary: 'Crear nueva orden de movimiento de inventario' })
    @ApiBody({
        type: ordenSalidaDTO
    })
    async createOrden(
        @Body() orden: ordenSalidaDTO
    ) {
        return await this.ordenesServices.createOrden(orden)
    }
}