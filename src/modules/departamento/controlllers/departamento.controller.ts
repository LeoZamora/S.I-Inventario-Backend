import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartamentoServices } from "../services/departamento.service";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { departamentoDTO } from "../dtos/departamento.dto";

@Controller('departamento')
@ApiTags('Departamentos')
export class DepartamentoController {
    constructor(
        private readonly deptoServices: DepartamentoServices
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los departamentos' })
    async findAllDepartamentos() {
        const deptops = await this.deptoServices.findAllDepartametos()

        return {
            code: 200,
            msg: 'Departamentos cargados',
            data: deptops
        }
    }

    @Post()
    @ApiOperation({ summary: 'crear un nuevo departamento' })
    @ApiBody({
        type: departamentoDTO
    })
    async createDepartamento(
        @Body() departamento: departamentoDTO
    ) {
        return (await this.deptoServices.createDepartamento(departamento))
    }
}