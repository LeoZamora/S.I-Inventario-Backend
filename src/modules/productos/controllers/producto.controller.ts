import { Controller, Get, Body, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { ProductosServices } from "../services/productos.service";
import { productoDTO } from "../dtos/producto.dto";
import { ProductosUtilsServices } from "../services/productoUtils.service";
import { tipoCompDTO } from "../dtos/tipoInfo.dto";

@Controller('productos')
@ApiTags('Productos')
export class ProductosController {
    constructor(
        private readonly productosServices: ProductosServices,
        private readonly productoUtils: ProductosUtilsServices
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    async findAll() {
        const prods = await this.productosServices.findAllProds()
        return {
            code: 200,
            msg: 'Productos Cargados',
            data: prods
        }
    }

    @Post()
    @ApiOperation({ summary: 'crear un nuevo producto' })
    @ApiBody({
        type: productoDTO,
    })
    async createProducto(
        @Body() producto: productoDTO
    ) {
        return await this.productosServices.createProducto(producto)
    }

    @Get('/tipoAlmacenamiento')
    @ApiOperation({ summary: 'Obtener los tipos de almancenamiento' })
    async findAllTipoAlmancenamiento() {
        return await this.productoUtils.findTipoAlmacenamiento()
    }

    @Post('/tipoAlmacenamiento')
    @ApiOperation({ summary: 'Obtener los tipos de almancenamiento' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoAlmacenamiento(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return await this.productoUtils.createTipoAlm(tipoAlm)
    }

    @Get('/tipoDispositivo')
    @ApiOperation({ summary: 'Obtener los tipos de almancenamiento' })
    async findAllTipoDispositivo() {
        return await this.productoUtils.findTipoDispositivo()
    }

    @Post('/tipoDispositivo')
    @ApiOperation({ summary: 'Obtener los tipos de almancenamiento' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoDispositivo(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return await this.productoUtils.createTipoDisp(tipoAlm)
    }
}