import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsObject,
} from "class-validator";

export class tipoCompDTO {
    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser un texto' })
    nombre: string

    @ApiProperty({ maxLength: 300 })
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto' })
    descripcion: string | null
}