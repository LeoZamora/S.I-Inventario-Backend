import { Args, Int, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { ProductosServices } from "../services/productos.service";
import { Producto } from '../entities/Producto.entity';

@Resolver(() => Producto)
export class ProductosResolvers {
    constructor(
        private readonly productosServices: ProductosServices,
    ) {}

    @Query(() => [Producto], { name:  'findProductos'})
    async findProductos(@Args('id', { type: () => Int }) id: number) {
        return (await this.productosServices.findProdGQL(id))
    }
}