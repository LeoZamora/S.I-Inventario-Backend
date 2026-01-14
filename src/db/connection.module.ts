import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.providers";

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})

export class DatabaseModule {}

// npx typeorm-model-generator -e mssql -h 127.0.0.1 -p 1433 -d DB_INVENTARIO -u sa -x "Leozamora05*" -o src/db/entities --noConfig --caseEntity pascal --caseProperty camel