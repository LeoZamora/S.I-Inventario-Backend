import { NestFactory } from "@nestjs/core";
import { Enviroments } from "./enviroments";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { GlobalHttpExceptionFilter } from "./common/filters/http.exception.filter";
// import * as rateLimit from 'express-rate-limit'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class Server {
    constructor(
        private readonly envs: Enviroments
    ) {}

    async bootstrap() {
        const { port } = this.envs.getEnv()
        const app = await NestFactory.create(AppModule)
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        )

        app.useGlobalFilters(new GlobalHttpExceptionFilter())

        // CONFIGURACION DE SWAGGER
        const configSwagger = new DocumentBuilder()
            .setTitle('API SI-Inventario')
            .build()

        const document = SwaggerModule.createDocument(app, configSwagger)
        SwaggerModule.setup('api', app, document, {
            customSiteTitle: 'SI-INVENTARIO',
        })

        app.use(helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
                    frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
                },
            }
        }))
        app.enableCors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Autorization'],
            credentials: true
        })

        // app.use(
        //     rateLimit.default({
        //         windowMs: 10 * 60 * 1000,
        //         max: 50,
        //         message: 'Demasiadas solicitudes desde esta ip, inténtlo de nuevo más tarde.'
        //     })
        // )

        await app.listen(port ?? 3011);

        console.log(`- Server is running on http://localhost:${port}/api`);
        console.log(`- Swagger disponible en: http://localhost:${port}/api`);
    }
}