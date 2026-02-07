import { Body, Controller, Get, Post, Param, ParseIntPipe, Put } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiBody } from "@nestjs/swagger";
import { OrdenesServices } from "../services/ordenes.service";
import { ordenDTO } from "../dtos/orden.dto";
import { tipoCompDTO } from "src/modules/productos/dtos/tipoInfo.dto";

@Controller('ordenes')
@ApiTags('Ordenes')
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
            msg: 'Ordenes cargadas',
            data: ordenes
        }
    }

    @Get('orden/:idOrden')
    @ApiOperation({ summary: 'Obtener orden por id' })
    async finOrdenBy (
        @Param('idOrden', ParseIntPipe) idOrden: number
    ) {
        return await this.ordenesServices.findOrdenBy(idOrden)
    }

    @Put('/revisar/:idOrden')
    @ApiOperation({ summary: 'Revisar una orden de salida' })
    async revisarOrden(
        @Param('idOrden', ParseIntPipe) idOrden: number
    ) {
        return (await this.ordenesServices.revisarOrden(idOrden, 'dba'))
    }

    @Put('/autorizar/:idOrden')
    @ApiOperation({ summary: 'Revisar una orden de salida' })
    async autorizarOrden(
        @Param('idOrden', ParseIntPipe) idOrden: number
    ) {
        return (await this.ordenesServices.autorizarOrden(idOrden, 'dba'))
    }

    @Get('/codigo-recomendado')
    @ApiOperation({ summary: 'Obtener código recomendado para nueva orden' })
    async getCodigoRecomendado() {
        return await this.ordenesServices.getCodigoRecomendado();
    }

    @Post()
    @ApiOperation({ summary: 'Crear nueva orden de movimiento de inventario' })
    @ApiBody({
        type: ordenDTO
    })
    async createOrden(
        @Body() orden: ordenDTO
    ) {
        return await this.ordenesServices.createOrden(orden)
    }

    @Get('/tipo-orden')
    @ApiOperation({ summary: 'Obtener todas los tipos de ordenes registradas' })
    async finAllTipoOrdenes () {
        const ordenes = await this.ordenesServices.findTipoOrden()

        return {
            code: 200,
            msg: 'Tipo de ordenes cargadas cargadas',
            data: ordenes
        }
    }

    @Post('/tipo-orden')
    @ApiOperation({ summary: 'Crear nuevo tipo de orden' })
    @ApiBody({
        type: tipoCompDTO
    })
    async createTipoOrden(
        @Body() tipoOrden: tipoCompDTO
    ) {
        return await this.ordenesServices.createTipoOrden(tipoOrden)
    }
}


// @Controller('ordenes-entrada')
// export class OrdenesEntradaController {
//     constructor(
//         private readonly ordenesEntradaServices: OrdenesServices
//     ) {}
//     @Get()
//     @ApiOperation({ summary: 'Obtener todas las ordenes registradas' })
//     async finAllOrdenes () {
//         const ordenes = await this.ordenesEntradaServices.findAllOrdenesEntrada()

//         return {
//             code: 200,
//             msg: 'Ordenes cargadas',
//             data: ordenes
//         }
//     }

//     @Get('/codigo-recomendado')
//     @ApiOperation({ summary: 'Obtener código recomendado para nueva orden' })
//     async getCodigoRecomendado() {
//         return await this.ordenesEntradaServices.getCodigoOrdEnt();
//     }

//     @Post()
//     @ApiOperation({ summary: 'Crear nueva orden de movimiento de inventario' })
//     @ApiBody({
//         type: ordenDTO
//     })
//     async createOrden(
//         @Body() orden: ordenDTO
//     ) {
//         return await this.ordenesEntradaServices.createOrden(orden)
//     }
// }