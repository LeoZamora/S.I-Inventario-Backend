import { DataSource } from "typeorm";
import { DetalleMovimientoInventario } from "src/modules/movimientos/entities/DetalleMovimientoInventario.entity";
import { MovimientoInventario } from "../entities/MovimientoInventario.entity";
import { TipoMovimientoInventario } from "src/modules/movimientos/entities/TipoMovimientoInventario.entity";
import { SolicitudesTraslado } from "../entities/SolicitudesTraslado.entity";
import { EstadosSolicitud } from "../entities/EstadoSolicitud.entity";
import { DetalleSolicitud } from "../entities/DetalleSolicitud.entity";
import { TipoSolicitud } from "../entities/TipoSolicitud.entity";

const TOKENS = {
    DATA_SOURCE: 'DATA_SOURCE',
    DETMOVINV_PROVIDE: 'DETMOVINV_PROVIDE',
    MOVINV_PROVIDE: 'MOVINV_PROVIDE',
    TIPOINVENT_PROVIDE: 'TIPOINVET_PROVIDE',
    TIPO_SOLICITUD_PROVIDE: 'TIPO_SOLICITUD_PROVIDE',
    SOLICITUD_TRASLADO_PROVIDE: 'SOLICITUD_TRASLADO_PROVIDE',
    DETALLE_SOLICITUD_PROVIDE: 'DETALLE_SOLICITUD_PROVIDE',
    ESTADO_SOLICITUD_PROVIDE: 'ESTADO_SOLICITUD_PROVIDE',
}

export const movimientoProviders = [
    {
        provide: TOKENS.DETMOVINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(DetalleMovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.MOVINV_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(MovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPOINVENT_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(TipoMovimientoInventario),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.SOLICITUD_TRASLADO_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(SolicitudesTraslado),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.DETALLE_SOLICITUD_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(DetalleSolicitud),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.ESTADO_SOLICITUD_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(EstadosSolicitud),
        inject: [TOKENS.DATA_SOURCE]
    },
    {
        provide: TOKENS.TIPO_SOLICITUD_PROVIDE,
        useFactory: (datasSource: DataSource) => datasSource.getRepository(TipoSolicitud),
        inject: [TOKENS.DATA_SOURCE]
    }
]