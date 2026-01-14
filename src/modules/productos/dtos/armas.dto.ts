import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsDecimal,
    IsBoolean,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class armasDTO {
    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsString()
    numSerie: string

    @ApiProperty({  })
    @IsNumber({}, { message: 'El dato debe ser de tipo entero' })
    @IsNotEmpty({ message: 'Ingrese la capacidad del cargador' })
    capacidadCargador: number

    @ApiProperty({ nullable: true })
    @IsDecimal()
    @IsOptional()
    longitudCanon: number | null

    @ApiProperty()
    @IsBoolean({ message: 'licencia debe ser un dato boolean' })
    @IsNotEmpty({ message: 'Cuenta con licencia?' })
    licencia: boolean

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'Ingrese el material de fabricacion del arma' })
    @MaxLength(50)
    @IsString({ message: 'El detalle del material debe ser un texto' })
    material: string

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el calibre del arma' })
    @IsNumber()
    idCalibre: number;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de arma' })
    @IsNumber()
    idTipoArma: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el sitema de disparo del arma' })
    @IsNumber()
    idSistemaDisparo: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el id del producto' })
    @IsNumber()
    idProducto: number;
}