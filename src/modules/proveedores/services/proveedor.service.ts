import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Proveedores } from '../entities/Proveedores.entity';

@Injectable()
export class ProveedorServices {
    constructor(
        @Inject('PROVEEDORES_PROVIDE')
        private proveedorRepository: Repository<Proveedores>
    ) {}


    async filAllProveedores(): Promise<Proveedores[]> {
        const proveedores = await this.proveedorRepository.find({
            relations: [
                'proveedorProducto',
            ],
            order: {
                idProveedor: 'ASC'
            }
        })

        return proveedores
    }
}