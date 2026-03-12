import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsObject,
} from "class-validator";
import { Field, Float, Int, InputType } from "@nestjs/graphql";

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

export class tipoProductoDTO {
    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser un texto' })
    nombre: string

    @ApiProperty({ maxLength: 300 })
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto' })
    descripcion: string | null

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @Field(() => String, { nullable: true })
    usuarioRegistro: string;
}

export class catImpresoraDTO {
    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @Field()
    nombreCategoria: string

    @ApiProperty({ maxLength: 300 })
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto' })
    @Field(type => String, { nullable: true })
    descripcion: string | null

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @Field(() => String, { nullable: true })
    usuarioRegistro: string;
}