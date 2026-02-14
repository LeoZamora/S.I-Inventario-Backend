import { Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { InventarioServices } from "../services/inventario.service";

@Resolver()
export class InventarioResolvers {
    constructor(
        private readonly inventarioServices: InventarioServices,
    ) {}

    @Query(() => [], { name:  'findProductos'})
    async findProductos() {
        return this.inventarioServices.findInventarioProducto()
    }
}