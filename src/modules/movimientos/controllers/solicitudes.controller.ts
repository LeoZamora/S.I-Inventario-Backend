import { Controller, Get, Post, Body, Param, ParseIntPipe, Put } from "@nestjs/common";
import { SolicitudService } from "../services/solicitud.service";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { solicitudDTO } from "../dtos/solicitud.dto";
import { tipoCompDTO } from "src/modules/productos/dtos/tipoInfo.dto";

@ApiTags('Solicitudes de Traslado')
@Controller('solicitudes')
export class SolicitudesController {
    constructor(
        private readonly solicitudService: SolicitudService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las solicitudes de traslado' })
    async getAllSolicitudes() {
        return await this.solicitudService.findAllSolicitudes();
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva solicitud de traslado' })
    @ApiBody({
        type: solicitudDTO,
    })
    async createSolicitud(
        @Body() solicitud: solicitudDTO
    ) {
        return (await this.solicitudService.createSolicitud(solicitud))
    }

    @Get('solicitud/:idSolicitud')
    @ApiOperation({ summary: 'Obtener una solicitud de traslado por ID' })
    async getSolicitudById(
        @Param('idSolicitud', ParseIntPipe) idSolicitud: number
    ) {
        return this.solicitudService.findSolicitudBy(idSolicitud);
    }

    @Put('/revisar/:idSolicitud')
    @ApiOperation({ summary: 'Revisar una solicitud de traslado' })
    async revisarSolicitud(
        @Param('idSolicitud', ParseIntPipe) idSolicitud: number
    ) {
        return (await this.solicitudService.revisarSolicitud(idSolicitud, 'dba'))
    }

    @Put(`/autorizar/:idSolicitud`)
    @ApiOperation({ summary: 'Autorizar una solicitud de traslado' })
    async autorizarSolicitud(
        @Param('idSolicitud', ParseIntPipe) idSolicitud: number
    ) {
        return (await this.solicitudService.autorizarSolicitud(idSolicitud, 'dba'))
    }

    @Get('/codigo-recomendado')
    @ApiOperation({ summary: 'Obtener un código recomendado para en base al tipo de estado' })
    async getCodigoRecomendado() {
        return (await this.solicitudService.getCodigoRecomendado());
    }

    @Get('/tipo-solicitud')
    @ApiOperation({ summary: 'Obtener todos los tipos de solicitud' })
    async getAllTipoSolicitud() {
        return await this.solicitudService.findTipoSolicitud();
    }

    @Post('/tipo-solicitud')
    @ApiOperation({ summary: 'Crear un nuevo tipo de solicitud' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoSolicitud(
        @Body() solicitud: tipoCompDTO
    ) {
        return (await this.solicitudService.createTipoSolicitud(solicitud))
    }
}