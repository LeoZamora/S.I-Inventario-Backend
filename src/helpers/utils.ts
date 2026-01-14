import { BadRequestException } from "@nestjs/common";
import { armasDTO } from "src/modules/productos/dtos/armas.dto";
import { equipoComputoDTO } from "src/modules/productos/dtos/equiposComputo.dto"
import { impresoraDTO } from "src/modules/productos/dtos/impresoras.dto";
import { mobiliarioDTO } from "src/modules/productos/dtos/mobiliario.dto";
import { ArmasFuego } from "src/modules/productos/entities/ArmasFuego.entity";
import { EquiposComputo } from "src/modules/productos/entities/EquiposComputo.entity";
import { Impresoras } from "src/modules/productos/entities/Impresoras.entity";
import { Mobiliario } from "src/modules/productos/entities/Mobiliario.entity";
import { QueryRunner } from "typeorm";

// FUNCTIONS GUARDS VALIDATION
export function isEquipoComputo(obj: any): obj is equipoComputoDTO {
    if(!obj || typeof obj !== 'object') return false

    return obj &&
        typeof obj.ramGB === 'number' &&
        typeof obj.cantidadAlm === 'number' &&
        typeof obj.procesador === 'string' &&
        typeof obj.idTipoDispositivo === 'number' &&
        typeof obj.idTipoAlmacenamiento === 'number' &&
        typeof obj.idProducto === 'number' &&
        typeof obj.usuarioRegistro === 'string'
}

export function isArma(obj: any): obj is armasDTO {
    if(!obj || typeof obj !== 'object') return false

    return obj &&
        typeof obj.numSerie === 'string' &&
        typeof obj.capacidadCargador === 'number' &&
        (typeof obj.longitudCanon === 'number' ||  obj.longitudCanon === null) &&
        typeof obj.licencia === 'boolean' &&
        typeof obj.material === 'string' &&
        typeof obj.idCalibre === 'number' &&
        typeof obj.usuarioRegistro === 'string' &&
        typeof obj.idTipoArma === 'number' &&
        typeof obj.idSistemaDisparo === 'number' &&
        typeof obj.idProducto === 'number'
}

export function isMobiliario(obj: any): obj is mobiliarioDTO {
    if(!obj || typeof obj !== 'object') return false

    return obj &&
        typeof obj.color === 'string' &&
        typeof obj.usoDestinado === 'string' &&
        (typeof obj.acabado === 'number' || obj.acabado === null) &&
        typeof obj.material === 'string' &&
        typeof obj.dimensiones === 'string' &&
        typeof obj.usuarioRegistro === 'string' &&
        typeof obj.idProducto === 'number'
}

export function isImpresora(obj: any): obj is impresoraDTO {
    if(!obj || typeof obj !== 'object') return false

    return obj &&
        (typeof obj.color === 'string' || obj.color === null) &&
        typeof obj.noSerie === 'string' &&
        typeof obj.idTipoImpresion === 'number' &&
        typeof obj.idCategoriaImpresora === 'number' &&
        typeof obj.idTipoConexion === 'number' &&
        typeof obj.usuarioRegistro === 'string' &&
        typeof obj.idProducto === 'number'
}


export async function validateTypeProd(producto: any, idProducto: number, queryRunner: QueryRunner) {
    try {
        if (isEquipoComputo({...producto, idProducto})) {
            const newRegister = queryRunner.manager.create(EquiposComputo, {
                ...producto,
                idProducto
            })
            await queryRunner.manager.save(EquiposComputo, newRegister)
            return
        }

        if (isArma({...producto, idProducto})) {
            const newRegister = queryRunner.manager.create(ArmasFuego, {
                ...producto,
                idProducto
            })
            await queryRunner.manager.save(ArmasFuego, newRegister)
            return
        }

        if (isMobiliario({...producto, idProducto})) {
            const newRegister = queryRunner.manager.create(Mobiliario, {
                ...producto,
                idProducto
            })
            await queryRunner.manager.save(Mobiliario, newRegister)
            return
        }

        if (isImpresora({...producto, idProducto})) {
            const newRegister = queryRunner.manager.create(Impresoras, {
                ...producto,
                idProducto
            })
            await queryRunner.manager.save(Impresoras, newRegister)
            return
        }

        return
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new BadRequestException(
            error.message ?? 'Error al registrar detalles del producto'
        )
    }
}