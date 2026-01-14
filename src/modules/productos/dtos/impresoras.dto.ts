import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsDate,
    IsObject,
    IsDecimal,
    IsBoolean,
} from "class-validator";

export class impresoraDTO {
    @ApiProperty({ nullable: true })
    @IsOptional()
    @MaxLength(50)
    @IsString({ message: 'El color debe ser un texto' })
    color: string | null

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El numero de serie es obligatorio' })
    @IsString({ message: 'El numero de serie debe ser un texto' })
    noSerie: string

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de impresion' })
    @IsNumber()
    idTipoImpresion: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de impresora' })
    @IsNumber()
    idCategoriaImpresora: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de conexion' })
    @IsNumber()
    idTipoConexion: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el id del producto' })
    @IsNumber()
    idProducto: number;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;
}