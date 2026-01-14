import { Module } from "@nestjs/common";
import { categoriasProviders } from "./providers/categoria.providers";
import { estadosProviders } from "./providers/Estados.providers";
import { EstadosController } from "./controllers/estados.controller";
import { EstadosServices } from "./services/estados.service";
import { CategoriaServices } from "./services/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";

@Module({
    imports: [],
    controllers: [
        EstadosController,
        CategoriaController
    ],
    providers: [
        ...categoriasProviders,
        ...estadosProviders,
        EstadosServices,
        CategoriaServices
    ],
    exports: [
        ...categoriasProviders,
        ...estadosProviders,
        EstadosServices,
        CategoriaServices
    ],
})
export class CatalogModule {}