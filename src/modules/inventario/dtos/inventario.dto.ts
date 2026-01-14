import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  IsOptional,
} from "class-validator";

export class inventarioDTO {

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El código de inventario debe ser texto' })
    @IsNotEmpty({ message: 'El código de inventario es obligatorio' })
    @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
    codigoInventario: string;

    @ApiProperty({ maxLength: 100 })
    @IsString({ message: 'El nombre del inventario debe ser texto' })
    @IsNotEmpty({ message: 'El nombre del inventario es obligatorio' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    nombreInventario: string;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    observaciones: string;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;

    @ApiProperty()
    @IsNumber({}, { message: 'La bodega debe ser un número válido' })
    idBodega: number;

    @ApiProperty()
    @IsNumber({}, { message: 'El departamento debe ser un número válido' })
    idDepartamento: number;
}