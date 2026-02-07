import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsArray,
    ArrayMinSize,
    ValidateNested,
    Min,
    IsOptional,
} from "class-validator";

export class estadoDTO {
    // @ApiProperty({ maxLength: 50 })
    // @IsNotEmpty({ message: 'El codigo de estado es obligatorio' })
    // @IsString({ message: 'El codigo de estado debe ser un texto' })
    // @MaxLength(50, { message: 'El codigo de estado no debe exceder los 50 caracteres' })
    // codigoEstado: string

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre del estado es obligatorio' })
    @IsString({ message: 'El nombre del estado debe ser un texto' })
    @MaxLength(50, { message: 'El nombre del estado no debe exceder los 50 caracteres' })
    nombreEstado: string

    @ApiProperty({ maxLength: 300 })
    @IsNotEmpty({ message: 'La descripcion es obligatoria' })
    @IsString({ message: 'La descripcion debe ser un texto' })
    @MaxLength(300, { message: 'La descripcion no debe exceder los 300 caracteres' })
    descripcion: string

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'El tipo de estado debe ser un numero' })
    idTipoEstado: number
}

export class tipoEstadoDTO  {
    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El codigo del tipo estado es obligatorio' })
    @IsString({ message: 'El codigo del tipo estado debe ser un texto' })
    @MaxLength(50, { message: 'El codigo del tipo estado no debe exceder los 50 caracteres' })
    codigoTipoEstado: string

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre del tipo estado es obligatorio' })
    @IsString({ message: 'El nombre del tipo estado debe ser un texto' })
    @MaxLength(50, { message: 'El nombre del tipo estado no debe exceder los 50 caracteres' })
    nombreTipoEstado: string

    @ApiProperty({ maxLength: 300 })
    @IsNotEmpty({ message: 'La descripcion es obligatoria' })
    @IsString({ message: 'La descripcion debe ser un texto' })
    @MaxLength(300, { message: 'La descripcion no debe exceder los 300 caracteres' })
    descripcion: string

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El codigo de estados es obligatorio' })
    @IsString({ message: 'El codigo de estados debe ser un texto' })
    @MaxLength(50, { message: 'El codigo de estados no debe exceder los 50 caracteres' })
    codigoEstados: string
}
