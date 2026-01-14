import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { Response } from "express";
import { CategoriaServices } from "../services/categoria.service";
import { categoriaDTO, subCategoriaDTO } from "../dtos/categorias.dto";

@Controller('categoria')
@ApiTags('Categorias')
export class CategoriaController {
    constructor(
        private readonly categoriaServices: CategoriaServices
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorias' })
    async findAllCat() {
        const categorias = await this.categoriaServices.findAllCategoria()
        return {
            code: 200,
            msg: 'Categorias cargadas',
            data: categorias
        }
    }

    @Get('/sub-categorias')
    @ApiOperation({ summary: 'Obtener todas las categorias' })
    async findAllSubCat() {
        const subCategorias = await this.categoriaServices.finAllSubCategoria()
        return {
            code: 200,
            msg: 'SubCategorias cargadas',
            data: subCategorias
        }
    }

    @Post()
    @ApiOperation({ summary: 'creacion de categoria', })
    @ApiBody({
        type: categoriaDTO
    })
    async createCategoria(
        @Body() categoria: categoriaDTO,
    ) {
        return await this.categoriaServices.createCategoria(categoria)
    }

    @Post('/sub-categoria')
    @ApiOperation({ summary: 'creacion de subCategoria', })
    @ApiBody({
        type: subCategoriaDTO
    })
    async createSubCategoria(
        @Body() categoria: subCategoriaDTO,
    ) {
        return await this.categoriaServices.createSubCategoria(categoria)
    }
}