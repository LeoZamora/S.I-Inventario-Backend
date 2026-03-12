import { Module } from "@nestjs/common";
import { inventarioProviders } from "./providers/Inventario.providers";
import { InventarioController } from "./controllers/inventario.controller";
import { InventarioServices } from "./services/inventario.service";
import { LogisticaController } from "./controllers/logistica.controller";
import { LogisticaServices } from "./services/logistica.service";
import { CatalogModule } from "../catalog/Catalog.module";
import { LogisticaResolver } from "./resolvers/logistica.resolver";
import { InventarioResolvers } from "./resolvers/Inventario.resolver";

@Module({
    imports: [
        CatalogModule
    ],
    controllers: [
        InventarioController,
        LogisticaController
    ],
    providers: [
        ...inventarioProviders,
        InventarioServices,
        LogisticaServices,
        LogisticaResolver,
        InventarioResolvers
    ],
    exports: [
        ...inventarioProviders,
        InventarioServices,
        LogisticaServices
    ],
})

export class InventarioModule {}