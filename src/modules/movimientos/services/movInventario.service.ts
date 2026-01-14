import { Injectable, Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MovimientoInventario } from "src/modules/movimientos/entities/MovimientoInventario.entity";

@Injectable()
export class MovimientoInventarioServices {
    constructor(
        @Inject('MOVINV_PROVIDE')
        private movInventario: Repository<MovimientoInventario>,

        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) {}
}