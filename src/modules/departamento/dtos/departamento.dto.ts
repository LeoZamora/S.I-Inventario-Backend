import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsObject,
} from "class-validator";

export class departamentoDTO {
    @ApiProperty({ name: 'codigoDepartamento', type: 'string' })
    @IsNotEmpty({ message: 'El codigo es obligatorio' })
    @IsString({ message: 'El codigo debe ser de tipo texto' })
    codigoDepartamento: string

    @ApiProperty({ name: 'descripcion', type: 'string' })
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto' })
    descripcion: string | null

    @ApiProperty({ name: 'nombreDepartamento', type: 'string' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser de tipo texto' })
    nombreDepartamento: string

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;
}