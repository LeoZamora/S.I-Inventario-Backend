import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    IsOptional,
    IsDate,
    IsArray,
    ValidateNested,
    Min,
    ArrayMinSize,
    ValidateIf,
} from "class-validator";

export class detalleOrdenDTO {
    @ApiProperty({ minLength: 1 })
    @Min(1, { message: 'El id del producto debe ser mayor que 0' })
    @IsNumber({}, { message: 'El id debe ser un numero' })
    idProducto: number

    @ApiProperty()
    @IsNotEmpty({ message: 'Ingrese la cantidad de producto' })
    @IsNumber({}, { message: 'La cantidad deber ser un numero entero' })
    cantidad: number

    @ApiProperty()
    @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
    @IsNumber(
        { maxDecimalPlaces: 4,},
        { message: 'El precio debe ser un numero' })
    precioUnitario: number

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser un texto' })
    observaciones: string | null
}

export class ordenSalidaDTO {
    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El codigo debe ser un texto' })
    @IsNotEmpty({ message: 'El codigo es obligatorio' })
    @MaxLength(50)
    codigoOrden: string

    @ApiProperty()
    @ValidateIf((_, value) => value !== null)
    @IsString({ message: 'Las observaciones deben ser un texto' })
    observaciones: string | null

    @ApiProperty({ minLength: 1 })
    @IsNumber({}, { message: 'Ingrese el id de la solicitud' })
    idSolicitud: number;

    @ApiProperty()
    @Type(() => Date)
    @IsNotEmpty({ message: 'La fecha de emision es obligatoria' })
    @IsDate({ message: 'La fecha de emision debe ser de tipo date' })
    fechaEmision: Date

    @ApiProperty({ maxLength: 50 })
    @MaxLength(50)
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    usuarioRegistro: string;


    @ApiProperty({ type: [detalleOrdenDTO] })
    @IsNotEmpty({ message: 'Los detalles son obligatorios' })
    @IsArray({ message: 'Tiene que agregar uno o mas detalles en un arreglo' })
    @ArrayMinSize(1, { message: 'Debe agregar al menos un detalle' })
    @ValidateNested({ each: true })
    @Type(() => detalleOrdenDTO)
    detalleOrden: detalleOrdenDTO[]
}