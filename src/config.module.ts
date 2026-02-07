import { Global, Module } from "@nestjs/common";
import { Enviroments } from "./enviroments";
import { DatabaseModule } from "./db/connection.module";
import { GraphQLModule } from '@nestjs/graphql'
import {
    ApolloDriver, ApolloDriverConfig
} from '@nestjs/apollo'
import { join } from "path";

@Global()
@Module({
    imports: [
        DatabaseModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            transformAutoSchemaFile: true,
            sortSchema: true,
            installSubscriptionHandlers: true,
            // typePaths: ['./**/*.graphql'],
            // definitions: {
            //     path: join(process.cwd(), 'src/graphql.ts'),
            //     typeName: (name: string) => `${name}Schema`
            // },
            // buildSchemaOptions: {
            //     directives: [
            //         new GraphQLDirective({
            //             name: 'upper',
            //             locations: [DirectiveLocation.FIELD_DEFINITION]
            //         })
            //     ]
            // }
        })
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