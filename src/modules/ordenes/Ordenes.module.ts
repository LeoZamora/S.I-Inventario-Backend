import { Module } from "@nestjs/common";
import { ordenesProviders } from './providers/ordenes.providers';
import { OrdenesServices } from "./services/ordenes.service";
import { OrdenesController } from "./controllers/ordenes.controller";
import { CatalogModule } from "../catalog/Catalog.module";

@Module({
    imports: [
        CatalogModule
    ],
    controllers: [
        OrdenesController,
        // OrdenesEntradaController
    ],
    providers: [
        ...ordenesProviders,
        OrdenesServices
    ],
    exports: [
        OrdenesServices
    ],
})
export class OrdenesModule {}