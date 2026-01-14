import { Module } from "@nestjs/common";
import { proveedoresProviders } from "./providers/proveedores.providers";

@Module({
    imports: [],
    controllers: [],
    providers: [
        ...proveedoresProviders
    ],
    exports: [],
})
export class ProveedoresModule {}