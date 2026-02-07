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

export class detalleSolicitudDTO {
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

export class solicitudDTO {
    @ApiProperty({ name: 'codigoSolicitud', type: 'string', maxLength: 50 })
    @IsString({ message: 'El código de la solicitud debe ser texto' })
    @IsNotEmpty({ message: 'El código de la solicitud es obligatorio' })
    @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
    codigoSolicitud: string;

    @ApiProperty({ name: 'solicitante', type: 'string', maxLength: 100 })
    @IsString({ message: 'El solicitante debe ser texto' })
    @IsNotEmpty({ message: 'El solicitante es obligatorio' })
    @MaxLength(100, { message: 'El solicitante no puede exceder 100 caracteres' })
    solicitante: string;

    @ApiProperty({ name: 'observaciones', type: 'string', nullable: true })
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    observaciones: string | null;

    @ApiProperty({ name: 'motivo', type: 'string' })
    @IsString({ message: 'El motivo debe ser texto' })
    @IsNotEmpty({ message: 'El motivo es obligatorio' })
    motivo: string;

    @ApiProperty({ name: 'usuarioRegistro', type: 'string', maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El usuario de registro es obligatorio' })
    @MaxLength(50, { message: 'El usuario no puede exceder 50 caracteres' })
    usuarioRegistro: string;

    @ApiProperty({ name: 'idBodegaSolicitante', type: 'number' })
    @IsNumber({}, { message: 'La bodega solicitante debe ser un número válido' })
    idBodegaSolicitante: number;

    @ApiProperty({ name: 'idBodegaSolicitada', type: 'number' })
    @IsNumber({}, { message: 'La bodega solicitada debe ser un número válido' })
    idBodegaSolicitada: number;

    @ApiProperty({ name: 'idTipoSolicitud', type: 'number' })
    @IsNumber({}, { message: 'El tipo de solicitud debe ser un número válido' })
    idTipoSolicitud: number;

    @ApiProperty({ name: 'detalles', type: [detalleSolicitudDTO] })
    @IsNotEmpty({ message: 'Los detalles son obligatorios' })
    @IsArray({ message: 'Tiene que agregar uno o mas detalles en un arreglo' })
    @ArrayMinSize(1, { message: 'Debe agregar al menos un detalle' })
    @ValidateNested({ each: true })
    @Type(() => detalleSolicitudDTO)
    detalles: detalleSolicitudDTO[];
}