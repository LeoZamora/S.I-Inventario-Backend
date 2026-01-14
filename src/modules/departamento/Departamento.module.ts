import { Module } from "@nestjs/common";
import { departamentoProviders } from "./providers/departamento.providers";

@Module({
    imports: [],
    controllers: [],
    providers: [
        ...departamentoProviders
    ],
    exports: [],
})
export class DepartamentoModule {}