import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
} from "class-validator";

export class equipoComputoDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsNumber({ }, { message: 'Ingrese la cantidad memoria ram' })
    ramGB: number

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsNumber({ }, { message: 'Ingrese la cantidad almacenamiento' })
    cantidadAlm: number

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'Ingrese el nombre del procesador' })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @MaxLength(50, { message: 'Maximo 50 caracteres' })
    procesador: string;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsNumber({}, { message: 'Ingrese el id del tipo de dispositivo' })
    idTipoDispositivo: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsNumber({}, { message: 'Ingrese el id del tipo de almacenamiento' })
    idTipoAlmacenamiento: number;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    @IsNumber({}, { message: 'Ingrese el id del tipo de almacenamiento' })
    idProducto: number;

    @ApiProperty({ maxLength: 50 })
    @IsString({ message: 'El usuario de registro debe ser texto' })
    @IsNotEmpty({ message: 'El campo es obligatorio' })
    usuarioRegistro: string;
}