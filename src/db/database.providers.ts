import { Enviroments } from "src/enviroments";
import { DataSource } from "typeorm";

export const databaseProviders = [{
    provide: 'DATA_SOURCE',
    inject: [Enviroments],
    useFactory: async (env: Enviroments) => {
        const { dbUser, dbPass, dbName, dbServer, dbPort } = env.getEnv()

        const dataSource = new DataSource({
            type: 'mssql',
            host: dbServer,
            port: dbPort,
            username: dbUser,
            password: dbPass,
            database: dbName,
            synchronize: false,
            logging: false,
            options: {
                encrypt: false,
                trustServerCertificate: true
            },
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ]
        })

        try {
            await dataSource.initialize();
            console.log('Connected database Successfully');
            return dataSource;
        } catch (error) {
            console.error('Error al conectar con la base de datos', error);
            throw error;
        }
    }
}]