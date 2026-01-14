import { Module } from "@nestjs/common";
import { productoProviders } from "./providers/producto.providers";
import { catalogArmasProviders } from "./providers/catalogArmasProd.providers";
import { catalogCompProviders } from "./providers/catalogCompProd.providers";
import { ProductosServices } from "./services/productos.service";
import { ProductosController } from "./controllers/producto.controller";
import { InventarioModule } from "../inventario/Inventario.module";
import { CatalogModule } from "../catalog/Catalog.module";
import { ProductosUtilsServices } from "./services/productoUtils.service";

@Module({
    imports: [
        InventarioModule,
        CatalogModule,
    ],
    controllers: [
        ProductosController
    ],
    providers: [
        ...productoProviders,
        ...catalogArmasProviders,
        ...catalogCompProviders,
        ProductosServices,
        ProductosUtilsServices
    ],
    exports: [
        ProductosServices,
        ProductosUtilsServices
    ],
})

export class ProductoModule {}