import { Global, Module } from "@nestjs/common";
import { Enviroments } from "./enviroments";
import { DatabaseModule } from "./db/connection.module";

@Global()
@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        Enviroments,
    ],
    exports: [
        Enviroments,
        DatabaseModule,
    ]
})

export class ConfigModule {}