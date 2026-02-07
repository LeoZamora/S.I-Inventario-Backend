import { Module } from "@nestjs/common";
import { departamentoProviders } from "./providers/departamento.providers";
import { DepartamentoController } from "./controlllers/departamento.controller";
import { DepartamentoServices } from "./services/departamento.service";

@Module({
    imports: [],
    controllers: [
        DepartamentoController
    ],
    providers: [
        ...departamentoProviders,
        DepartamentoServices
    ],
    exports: [
        DepartamentoServices
    ],
})
export class DepartamentoModule {}