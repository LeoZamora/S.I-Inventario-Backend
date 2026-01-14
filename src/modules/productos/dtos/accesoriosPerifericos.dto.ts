import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,

} from "class-validator";

export class accesoriosDTO {
    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    observaciones: string | null

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el tipo de conexion' })
    @IsNumber()
    idTipoConexion: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'Ingrese el id del producto' })
    @IsNumber()
    idProducto: number;

    @ApiProperty({ maxLength: 50 })
    @MaxLength(50)
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;
}