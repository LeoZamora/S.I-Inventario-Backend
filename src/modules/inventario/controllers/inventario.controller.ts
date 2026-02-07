import {
    Controller,
    Get,
    Post,
    Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { InventarioServices } from "../services/inventario.service";
import { inventarioDTO } from "../dtos/inventario.dto";

@ApiTags('Inventario')
@Controller('inventario')
export class InventarioController {
    constructor(
        private readonly inventarioServices: InventarioServices
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Inventarios registrados',
    })
    async findAll() {
        const inventarios = await this.inventarioServices.findAll()

        return {
            code: 200,
            msg: 'Inventario cargados',
            data: inventarios
        }
    }

    @Post()
    @ApiOperation({ summary: 'Registro de inventario' })
    @ApiBody({
        type: inventarioDTO,
    })
    async createInventario(
        @Body() body: inventarioDTO,
    ) {
        return await this.inventarioServices.createInventario(body)
    }

    @Get('/codigo-recomendado')
    @ApiOperation({ summary: 'Obtener un código recomendado para en base al tipo de estado' })
    async getCodigoRecomendado() {
        return (await this.inventarioServices.getCodigoRecomendado());
    }

    @Get('/productos')
    @ApiOperation({
        summary: 'Control de inventario cargado',
    })
    async findInvenProd() {
        return (await this.inventarioServices.findInventarioProducto())
    }
}