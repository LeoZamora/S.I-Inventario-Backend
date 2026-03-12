import { Module } from "@nestjs/common";
import { departamentoProviders } from "./providers/departamento.providers";
import { DepartamentoController } from "./controlllers/departamento.controller";
import { DepartamentoServices } from "./services/departamento.service";
import { DepartamentoResolvers } from "./resolvers/departamento.resolver";

@Module({
    imports: [],
    controllers: [
        DepartamentoController
    ],
    providers: [
        ...departamentoProviders,
        DepartamentoServices,
        DepartamentoResolvers
    ],
    exports: [
        DepartamentoServices
    ],
})
export class DepartamentoModule {}