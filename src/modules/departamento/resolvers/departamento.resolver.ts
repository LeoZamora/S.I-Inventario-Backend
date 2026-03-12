import { Args, Int, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { DepartamentoServices } from "../services/departamento.service";
import { Departamento } from "../entities/Departamento.entity";

@Resolver()
export class DepartamentoResolvers {
    constructor(
        private readonly departamentoServices: DepartamentoServices,
    ) {}

    @Query(() => [Departamento], { name: 'findDepartamentos' })
    async findDepartamentos() {
        return this.departamentoServices.findAllDepartametos()
    }

    @Query(() => Departamento, { name: 'findDepartamentoById' })
    async findInventarioById(
        @Args('idDepartamento', { type: () => Int }) idDepartamento: number
    ) {
        return (await this.departamentoServices.findDepartametosById(idDepartamento))
    }
}