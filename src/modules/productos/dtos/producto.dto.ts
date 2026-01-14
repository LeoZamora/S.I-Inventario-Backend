import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsObject,
} from "class-validator";

export class productoDTO {
    @ApiProperty({ maxLength: 50 })
    @IsString({ message:  'El código de producto debe ser texto' })
    @IsNotEmpty({ message: 'El código de producto es obligatorio' })
    @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
    codigoProducto: string

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre del producto debe ser texto' })
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @MaxLength(100, { message: 'El nombre no puede exceder 50 caracteres' })
    nombreProducto: string;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre de la marca debe ser texto' })
    @IsNotEmpty({ message: 'El nombre de la marca es obligatorio' })
    marca: string

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El nombre del modelo debe ser texto' })
    @IsNotEmpty({ message: 'El nombre del modelo es obligatorio' })
    modelo: string

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    observaciones: string | null;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Puede agregar una imagen de referencia' })
    imagen: string;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Las caracteristicas deben ser texto' })
    caracteristicasEspeciales: string | null;

    @ApiProperty({ minLength: 1 })
    @IsNumber({ maxDecimalPlaces:  4})
    @IsNotEmpty({ message: 'El precio es obligatorio' })
    precio: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock minimo de este producto' })
    stockMin: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock maximo de este producto' })
    stockMax: number

    @ApiProperty({ minLength: 1 })
    @IsNumber()
    @IsNotEmpty({ message: 'Ingrese el stock actual de este producto' })
    stock: number

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id de la subcategoria' })
    idSubCategoria: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id de la categoria' })
    idCategoria: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id del tipo de producto' })
    idTipoProducto: number;

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id del inventario' })
    idInventario: number;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsObject({ message: 'Informacion de un especifica del producto'})
    detallesEspecificos: object | null
}
