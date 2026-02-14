import { Resolver } from "@nestjs/graphql";
import { Query } from "@nestjs/graphql";
import { ProveedorServices } from "../services/proveedor.service";
import { Proveedores } from "../entities/Proveedores.entity";

@Resolver()
export class ProveedorResolver {
    constructor(
        private readonly proveedorService: ProveedorServices
    ) {}

    @Query(() => [Proveedores], { name: 'findAllProveedores' })
    async findAllProveedores() {
        return (await this.proveedorService.filAllProveedores())
    }
}