import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TipoAlmacenamiento } from "../entities/catalogComputo/TipoAlmacenamiento.entity";
import { TipoDispositivo } from "../entities/catalogComputo/TipoDispositivo.entity";
import { DataSource, Repository } from "typeorm";
import { catImpresoraDTO, tipoCompDTO } from "../dtos/tipoInfo.dto";
import { CategoriaImpresora } from "../entities/catalogComputo/CategoriaImpresora.entity";
import { TipoImpresora } from "../entities/catalogComputo/TipoImpresora.entity";
import { SistemaDisparo } from "../entities/catalogArmas/SistemaDisparo.entity";
import { TipoArma } from "../entities/catalogArmas/TipoArma.entity";
import { TipoCalibre } from "../entities/catalogArmas/TipoCalibre.entity";
import { TipoConexion } from "../entities/catalogComputo/TipoConexion.entity";

@Injectable()
export class ProductosUtilsServices {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource,

        @Inject('TIPO_ALM_PROVIDE')
        private tipoAlmacenamiento: Repository<TipoAlmacenamiento>,

        @Inject('TIPO_CONEXION_PROVIDE')
        private tipoConexion: Repository<TipoConexion>,

        @Inject('TIPO_DISP_PROVIDE')
        private tipoDispositivo: Repository<TipoDispositivo>,


        // IMPRESORA INJECTIONS
        @Inject('CAT_IMPRESORA_PROVIDE')
        private categoriaImpresora: Repository<CategoriaImpresora>,

        @Inject('TIPO_IMPRESORA_PROVIDE')
        private tipoImpresora: Repository<TipoImpresora>,

        // ARMA INJECTIONS
        @Inject('SISTEMADISP_PROVIDE')
        private sistemaDisparo: Repository<SistemaDisparo>,

        @Inject('TIPO_ARMA_PROVIDE')
        private tipoArma: Repository<TipoArma>,

        @Inject('TIPO_CALIBRE_PROVIDE')
        private tipoCalibre: Repository<TipoCalibre>
    ) {}

    async findTipoAlmacenamiento(): Promise<TipoAlmacenamiento[]> {
        return (await this.tipoAlmacenamiento.find())
    }

    async findTipoConexion(): Promise<TipoConexion[]> {
        return (await this.tipoConexion.find())
    }

    async findTipoDispositivo(): Promise<TipoDispositivo[]> {
        return (await this.tipoDispositivo.find())
    }

    async findCatImpresora(): Promise<CategoriaImpresora[]> {
        return (await this.categoriaImpresora.find())
    }

    async createTipoAlm(tipo: tipoCompDTO) {
        const exist = await this.tipoAlmacenamiento.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de almacenamiento'
            )
        }

        try {
            const newTipoAlm = this.tipoAlmacenamiento.create(tipo)
            await this.tipoAlmacenamiento.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Almacenamiento creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async createTipoConexion(tipo: tipoCompDTO) {
        const exist = await this.tipoConexion.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de conexion'
            )
        }

        try {
            const newTipoAlm = this.tipoConexion.create(tipo)
            await this.tipoConexion.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Conexion creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async createTipoDisp(tipo: tipoCompDTO) {
        const exist = await this.tipoDispositivo.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de dispositivo'
            )
        }

        try {
            const newTipoAlm = this.tipoDispositivo.create(tipo)
            await this.tipoDispositivo.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Dispositivo creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }


    // IMPRESORA SERVICES
    async createCatImpresora(cat: catImpresoraDTO) {
        const exist = await this.categoriaImpresora.findOne({
            where: { nombreCategoria: cat.nombreCategoria }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este categoria de impresora'
            )
        }

        try {
            const newCatImp = this.categoriaImpresora.create(cat)
            await this.categoriaImpresora.save(newCatImp)

            return {
                code: 200,
                msg: 'Categoria de impresora creada exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async findTipoImp(): Promise<TipoImpresora[]> {
        return (await this.tipoImpresora.find())
    }

    async createTipoImp(tipo: tipoCompDTO) {
        const exist = await this.tipoImpresora.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de impresora'
            )
        }

        try {
            const newTipoAlm = this.tipoImpresora.create(tipo)
            await this.tipoImpresora.save(newTipoAlm)

            return {
                code: 200,
                msg: 'Tipo de Impresora creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    // ARMAS SERVICES
    async findTipoArma(): Promise<TipoArma[]> {
        return (await this.tipoArma.find())
    }

    async createTipoArma(tipo: tipoCompDTO) {
        const exist = await this.tipoArma.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de arma'
            )
        }

        try {
            const newTipoArma = this.tipoArma.create(tipo)
            await this.tipoArma.save(newTipoArma)

            return {
                code: 200,
                msg: 'Tipo de Arma creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async findTipoCalibre(): Promise<TipoCalibre[]> {
        return (await this.tipoCalibre.find())
    }

    async createTipoCalibre(tipo: tipoCompDTO) {
        const exist = await this.tipoCalibre.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de calibre'
            )
        }

        try {
            const newTipoCalibre = this.tipoCalibre.create(tipo)
            await this.tipoCalibre.save(newTipoCalibre)

            return {
                code: 200,
                msg: 'Tipo de Calibre creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }

    async findSistemaDisparo(): Promise<SistemaDisparo[]> {
        return (await this.sistemaDisparo.find())
    }

    async createSistemaDisparo(tipo: tipoCompDTO) {
        const exist = await this.sistemaDisparo.findOne({
            where: { nombre: tipo.nombre }
        })

        if (exist) {
            throw new BadRequestException(
                'Ya existe este tipo de calibre'
            )
        }

        try {
            const newTipoArma = this.sistemaDisparo.create(tipo)
            await this.sistemaDisparo.save(newTipoArma)

            return {
                code: 200,
                msg: 'Tipo de Calibre creado exitosamente'
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }

            throw new InternalServerErrorException(
                `Error al crear el registro: ${error.message}`
            );
        }
    }
}