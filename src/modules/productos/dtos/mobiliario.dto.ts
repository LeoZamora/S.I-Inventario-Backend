import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,

} from "class-validator";

export class mobiliarioDTO {
    @ApiProperty({ maxLength: 50 })
    @MaxLength(50)
    @IsNotEmpty({ message: 'Ingrese el color del producto' })
    @IsString({ message: 'El color debe ser un texto' })
    color: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Ingrese el uso final del producto' })
    @IsString({ message: 'El uso debe ser texto' })
    usoDestinado: string

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'El uso debe ser texto' })
    acabado: string | null

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'El detalle del material debe ser un texto' })
    material: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Ingrese las dimensiones del producto' })
    @IsString({ message: 'Las dimensiones debe ser un texto' })
    dimensiones: string

    @ApiProperty({ maxLength: 50 })
    @MaxLength(50)
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de arma' })
    @IsNumber()
    idProducto: number;
}