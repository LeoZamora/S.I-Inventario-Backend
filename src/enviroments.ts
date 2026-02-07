import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class Enviroments {
    getEnv(): {
        port: number | string,
        dbUser: string,
        dbPass: string,
        dbName: string,
        dbServer: string,
        dbPort: number,
        jwtKey: string
    } {
        return {
            port: process.env.PORT || 3010,
            dbUser: process.env.DB_USER || 'sa',
            dbPass: process.env.DB_PASS || 'Leozamora05*',
            dbName: process.env.DB_NAME || 'SIGUNI',
            dbServer: '127.0.0.1',
            // dbServer: process.env.DB_HOST || 'host.docker.internal',
            jwtKey: process.env.JWT_KEY || 'leozamora.*',
            dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
        }
    }
}