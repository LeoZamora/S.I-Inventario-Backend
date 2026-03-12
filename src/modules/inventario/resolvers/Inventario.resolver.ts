import { Args, Int, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InventarioServices } from "../services/inventario.service";
import { Inventario } from "../entities/Inventario.entity";

@Resolver()
export class InventarioResolvers {
    constructor(
        private readonly inventarioServices: InventarioServices,
    ) {}

    @Query(() => [Inventario], { name: 'findInventarios' })
    async findInventarios() {
        return this.inventarioServices.findAll()
    }

    @Query(() => Inventario, { name: 'findInventarioById' })
    async findInventarioById(
        @Args('idInventario', { type: () => Int }) idInventario: number
    ) {
        return (await this.inventarioServices.findInventarioById(idInventario))
    }
}