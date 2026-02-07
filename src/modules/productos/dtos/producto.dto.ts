import { ApiProperty } from "@nestjs/swagger";
import { Field, Float, Int, InputType } from "@nestjs/graphql";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsObject,
} from "class-validator";

@InputType()
export class productoDTO {
    @ApiProperty({ maxLength: 50 })
    @IsString({ message:  'El código de producto debe ser texto' })
    @IsNotEmpty({ message: 'El código de producto es obligatorio' })
    @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
    @Field()
    codigoProducto: string

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre del producto debe ser texto' })
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @MaxLength(100, { message: 'El nombre no puede exceder 50 caracteres' })
    @Field()
    nombreProducto: string;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre de la marca debe ser texto' })
    @IsNotEmpty({ message: 'El nombre de la marca es obligatorio' })
    @Field()
    marca: string

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre del modelo debe ser texto' })
    @IsNotEmpty({ message: 'El nombre del modelo es obligatorio' })
    @Field()
    modelo: string

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    @Field(type => String, { nullable: true })
    observaciones: string | null;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Puede agregar una imagen de referencia' })
    @Field(type => String, { nullable: true })
    imagen: string | null;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las caracteristicas deben ser texto' })
    @Field(type => String, { nullable: true })
    caracteristicasEspeciales: string | null;

    @ApiProperty({ minLength: 1 })
    @IsNumber({ maxDecimalPlaces:  4})
    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @Field(type => Float)
    precio: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock minimo de este producto' })
    @Field(type => Int)
    stockMin: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock maximo de este producto' })
    @Field(type => Int)
    stockMax: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock actual de este producto' })
    @Field(type => Int)
    stock: number

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    @Field()
    usuarioRegistro: string;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id de la subcategoria' })
    @Field(type => Int)
    idSubCategoria: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id de la categoria' })
    @Field(type => Int)
    idCategoria: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id del tipo de producto' })
    @Field(type => Int)
    idTipoProducto: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id del inventario' })
    @Field(type => Int)
    idInventario: number;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsObject({ message: 'Informacion de un especifica del producto'})
    @Field(type => Object, { nullable: true })
    detallesEspecificos: object | null
}
