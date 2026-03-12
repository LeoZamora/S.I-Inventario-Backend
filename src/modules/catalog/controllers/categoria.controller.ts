import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { CategoriaServices } from "../services/categoria.service";
import { categoriaDTO, subCategoriaDTO, editSubCategoriaDTO } from "../dtos/categorias.dto";

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

    @Put('/sub-categoria/:idSubCategoria')
    @ApiOperation({ summary: 'editar de subCategoria', })
    @ApiBody({
        type: editSubCategoriaDTO
    })
    async editSubCategoria(
        @Param('idSubCategoria', ParseIntPipe) idSubCategoria: number,
        @Body() subCategoria: editSubCategoriaDTO,
    ) {
        return await this.categoriaServices.editSubCategoria(
            idSubCategoria,
            subCategoria
        )
    }

    @Get('/sub-categoria/codigo/:idCategoria')
    @ApiOperation({ summary: 'Obtener codigo para subcategorias' })
    async getCodigoSubCat(
        @Param('idCategoria', ParseIntPipe) idCategoria: number
    ) {
        return (await this.categoriaServices.getCodigoSubCategoria(idCategoria))
    }
}