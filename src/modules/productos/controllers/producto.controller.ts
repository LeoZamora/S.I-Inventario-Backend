import { Controller, Get, Body, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { ProductosServices } from "../services/productos.service";
import { productoDTO } from "../dtos/producto.dto";
import { ProductosUtilsServices } from "../services/productoUtils.service";
import { catImpresoraDTO, tipoCompDTO } from "../dtos/tipoInfo.dto";

@Controller('productos')
@ApiTags('Productos')
export class ProductosController {
    constructor(
        private readonly productosServices: ProductosServices,
    ) {}

    // PRODUCTO CONTROLLER

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
        return (await this.productosServices.createProducto(producto))
    }

    @Get('/codigo-recomendado')
    @ApiOperation({ summary: 'Obtener código recomendado para un nuevo producto' })
    async getCodigoRecomendado() {
        return await this.productosServices.getCodigoRecomendado();
    }

    @Get('/tipoProducto')
    @ApiOperation({ summary: 'Obtener los tipos de producto' })
    async findAllTipoProducto() {
        return (await this.productosServices.findTipoProducto())
    }

    @Post('/tipoProducto')
    @ApiOperation({ summary: 'Crear un nuevo tipo de producto' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoProducto(
        @Body() tipoProducto: tipoCompDTO
    ) {
        return (await this.productosServices.createTipoProducto(tipoProducto))
    }
}


@Controller('armas')
@ApiTags('Armas')
export class ArmasController {
    constructor(
        private readonly productoUtils: ProductosUtilsServices
    ) {}

    // ARMAS CONTROLLER
    @Get('/tipoCalibre')
    @ApiOperation({ summary: 'Obtener los tipos de calibre' })
    async findAllTipoCalibre() {
        return (await this.productoUtils.findTipoCalibre())
    }

    @Post('/tipoCalibre')
    @ApiOperation({ summary: 'Crear un nuevo tipo de calibre' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoCalibre(
        @Body() tipoCalibre: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoCalibre(tipoCalibre))
    }

    @Get('/tipoArma')
    @ApiOperation({ summary: 'Obtener los tipos de armas' })
    async findAllTipoArma() {
        return (await this.productoUtils.findTipoArma())
    }

    @Post('/tipoArma')
    @ApiOperation({ summary: 'Crear un nuevo tipo de arma' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoArma(
        @Body() tipoArma: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoArma(tipoArma))
    }

    @Get('/sistemaDisparo')
    @ApiOperation({ summary: 'Obtener los sistemas de disparo' })
    async findAllSistemaDisparo() {
        return (await this.productoUtils.findSistemaDisparo())
    }

    @Post('/sistemaDisparo')
    @ApiOperation({ summary: 'Crear un nuevo sistema de disparo' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createSistemaDisparo(
        @Body() tipoArma: tipoCompDTO
    ) {
        return (await this.productoUtils.createSistemaDisparo(tipoArma))
    }
}

@Controller('equipos-computo')
@ApiTags('Equipos de Computo')
export class EquiposComputoController {
    constructor(
        private readonly productoUtils: ProductosUtilsServices
    ) {}

    // TIPOS CONTROLLER
    @Get('/tipoAlmacenamiento')
    @ApiOperation({ summary: 'Obtener los tipos de almancenamiento' })
    async findAllTipoAlmancenamiento() {
        return (await this.productoUtils.findTipoAlmacenamiento())
    }

    @Post('/tipoAlmacenamiento')
    @ApiOperation({ summary: 'Crear un nuevo tipo de almacenamiento' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoAlmacenamiento(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoAlm(tipoAlm))
    }

    @Get('/tipoConexion')
    @ApiOperation({ summary: 'Obtener los tipos de conexiones' })
    async findAllTipoConexion() {
        return (await this.productoUtils.findTipoConexion())
    }

    @Post('/tipoConexion')
    @ApiOperation({ summary: 'Crear un nuevo tipo de almacenamiento' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoConexion(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoConexion(tipoAlm))
    }

    @Get('/tipoDispositivo')
    @ApiOperation({ summary: 'Obtener los tipos de dispositivos' })
    async findAllTipoDispositivo() {
        return (await this.productoUtils.findTipoDispositivo())
    }

    @Post('/tipoDispositivo')
    @ApiOperation({ summary: 'Crear un nuevot tipo de dispositivo' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoDispositivo(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoDisp(tipoAlm))
    }

    @Get('/tipoImpresora')
    @ApiOperation({ summary: 'Obtener los tipos de impresoras' })
    async findAllTipoImpresora() {
        return (await this.productoUtils.findTipoImp())
    }

    @Post('/tipoImpresora')
    @ApiOperation({ summary: 'Crear un nuevo tipo de impresora' })
    @ApiBody({
        type: tipoCompDTO,
    })
    async createTipoImpresora(
        @Body() tipoAlm: tipoCompDTO
    ) {
        return (await this.productoUtils.createTipoImp(tipoAlm))
    }


    // CATEGORIA IMPRESORA CONTROLLER
    @Get('/categoria-impresora')
    @ApiOperation({ summary: 'Obtener las categorias de las impresoras' })
    async findAllCatImpresora() {
        return (await this.productoUtils.findCatImpresora())
    }

    @Post('/categoria-impresora')
    @ApiOperation({ summary: 'Crear una nueva categoria de impresoras' })
    @ApiBody({
        type: catImpresoraDTO,
    })
    async createCatImpresora(
        @Body() catImp: catImpresoraDTO
    ) {
        return (await this.productoUtils.createCatImpresora(catImp))
    }
}