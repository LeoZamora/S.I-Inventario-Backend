import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
} from "class-validator";

export class ubicacionDTO {
    @ApiProperty({ name: 'codigoUbicacion', type: "string", maxLength: 50 })
    @IsString({ message: 'El codigo debe ser un texto' })
    @IsNotEmpty({ message: 'El codigo de ubicacion es obligatorio' })
    @MaxLength(50, { message: 'El codigo no debe exceder los 50 caracteres' })
    codigoUbicacion: string

    @ApiProperty({ name: 'nombreUbicacion', maxLength: 300 })
    @IsString({ message: 'El mnombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombreUbicacion: string

    @ApiProperty({name: 'direccion', nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    direccion: string | null ;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;
}

export class bodegaDTO {
    @ApiProperty({ name: 'codigoBodega', type: 'string' })
    @IsString({ message: 'El codigo debe ser un texto' })
    @IsNotEmpty({ message: 'El codigo es obligatorio' })
    codigoBodega: string

    @ApiProperty({ name: 'nombreBodega', maxLength: 300 })
    @IsString({ message: 'El mnombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombreBodega: string

    @ApiProperty({name: 'descripcion', nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    descripcion: string | null ;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;

    @ApiProperty()
    @IsNumber({}, { message: 'El id de la ubicacion debe ser un numero' })
    idUbicacion: number;
}