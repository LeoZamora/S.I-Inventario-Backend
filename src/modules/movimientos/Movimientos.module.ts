import { Module } from "@nestjs/common";
import { SolicitudesController } from "./controllers/solicitudes.controller";
import { SolicitudService } from "./services/solicitud.service";
import { movimientoProviders } from "./providers/movimientos.provider";
import { CatalogModule } from "../catalog/Catalog.module";

@Module({
    imports: [
        CatalogModule
    ],
    controllers: [SolicitudesController],
    providers: [
        ...movimientoProviders,
        SolicitudService,
    ],
    exports: [
        SolicitudService
    ],
})
export class MovimientosModule {}