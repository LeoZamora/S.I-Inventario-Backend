import { Resolver, Args, Int } from "@nestjs/graphql";
import { Query } from "@nestjs/graphql";
import { LogisticaServices } from "../services/logistica.service";
import { Bodegas } from "../entities/Bodegas.entity";
import { Ubicaciones } from "../entities/Ubicaciones.entity";

@Resolver()
export class LogisticaResolver {
    constructor(
        private readonly logisticaServices: LogisticaServices
    ) {}

    @Query(() => [Ubicaciones], { name: 'findAllUbicaciones' })
    async findAllUbicaciones() {
        return (await this.logisticaServices.findAllUbicaciones())
    }

    @Query(() => [Bodegas], { name: 'findAllBodegas' })
    async findAllBodegas() {
        return (await this.logisticaServices.findAllBodegas())
    }

    @Query(() => [Bodegas], { name: 'findAllBodegasCombobox' })
    async findAllBodegasCombobox(
        @Args('idUbicacion', { type: () => Int }) idUbicacion: number
    ) {
        return (await this.logisticaServices.findAllBodegasById(idUbicacion))
    }

    @Query(() => Ubicaciones, { name: 'findUbicacionById' })
    async findUbicacionById(
        @Args('idUbicacion', { type: () => Int }) idUbicacion: number
    ) {
        return (await this.logisticaServices.findUbicacionById(idUbicacion))
    }

    @Query(() => Bodegas, { name: 'findBodegaById' })
    async findBodegaById(
        @Args('idBodega', { type: () => Int }) idBodega: number
    ) {
        return (await this.logisticaServices.findBodegaById(idBodega))
    }
}