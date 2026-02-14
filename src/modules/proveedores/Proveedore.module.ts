import { Module } from "@nestjs/common";
import { proveedoresProviders } from "./providers/proveedores.providers";
import { ProveedorServices } from "./services/proveedor.service";
import { ProveedorResolver } from "./resolvers/proveedor.resolver";

@Module({
    imports: [],
    controllers: [],
    providers: [
        ...proveedoresProviders,
        ProveedorServices,
        ProveedorResolver
    ],
    exports: [],
})
export class ProveedoresModule {}