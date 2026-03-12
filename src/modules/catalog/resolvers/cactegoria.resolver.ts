import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { CategoriaServices } from "../services/categoria.service";
import { Categoria } from "../entities/Categoria.entity";
import { SubCategoria } from "../entities/SubCategoria.entity";

@Resolver(() => Categoria)
export class CategoriaResolver {
    constructor(
        private readonly categoriaServices: CategoriaServices
    ) {}

    @Query(() => [Categoria], { name: 'findAllCategories' })
    async findAllCategories() {
        return (await this.categoriaServices.findAllCategoria())
    }

    @Query(() => Categoria, { name: 'finCategoryById' })
    async findCategoryById(@Args('idCategoria',  { type: () => Int }) idCategoria: number) {
        return (await this.categoriaServices.findCategoryById(idCategoria))
    }

    @Query(() => [SubCategoria], { name: 'finSubCategoryByCategory' })
    async findSubCategoryByCategory(
        @Args('idCategoria',  { type: () => Int }) idCategoria: number
    ) {
        return (await this.categoriaServices.finSubCategoryByCategory(idCategoria))
    }

    @Query(() => SubCategoria, { name: 'finSubCategoryById' })
    async findSubCategoryById(@Args('idSubCategoria',  { type: () => Int }) idSubCategoria: number) {
        return (await this.categoriaServices.findSubCategoryById(idSubCategoria))
    }
}