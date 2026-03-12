import { Args, Int, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { ProductosServices } from "../services/productos.service";
import { Producto } from '../entities/Producto.entity';
import { TipoProducto } from "../entities/TipoProducto.entity";

@Resolver(() => Producto)
export class ProductosResolvers {
    constructor(
        private readonly productosServices: ProductosServices,
    ) {}

    @Query(() => [Producto], { name:  'findProductos'})
    async findProductos(@Args('id', { type: () => Int }) id: number) {
        return (await this.productosServices.findProdGQL(id))
    }

    @Query(() => [Producto], { name:  'findAllProductos'})
    async findAllProductos() {
        return (await this.productosServices.findProductos())
    }
}

@Resolver(() => TipoProducto)
export class TipoProductoResolver {
    constructor(
        private readonly productosServices: ProductosServices,
    ) {}

    @Query(() => [TipoProducto], { name:  'findTipoProducto'})
    async findTipoProducto() {
        return (await this.productosServices.findTipoProducto())
    }

    @Query(() => TipoProducto, { name:  'findTipoProductoById'})
    async findTipoProductoById(
        @Args('idTipoProducto', { type: () => Int }) idTipoProducto: number
    ) {
        return (await this.productosServices.findTipoProductoById(idTipoProducto))
    }
}