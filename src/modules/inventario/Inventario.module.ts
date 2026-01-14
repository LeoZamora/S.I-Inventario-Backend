import { Module } from "@nestjs/common";
import { inventarioProviders } from "./providers/Inventario.providers";
import { InventarioController } from "./controllers/inventario.controller";
import { InventarioServices } from "./services/inventario.service";

@Module({
    imports: [],
    controllers: [
        InventarioController
    ],
    providers: [
        ...inventarioProviders,
        InventarioServices
    ],
    exports: [
        ...inventarioProviders,
        InventarioServices
    ],
})

export class InventarioModule {}