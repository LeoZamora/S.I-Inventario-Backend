import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class categoriaDTO {
    @ApiProperty({ example: 'Equipos de Computo', maxLength: 100 })
    @IsNotEmpty({message: 'El nombre de la categoria es obligatorio'})
    @IsString({ message: 'El nombre debe ser un texto' })
    nombreCategoria: string;

    @ApiProperty({ example: 'laptos, pc, tablets, telefonos, perifericos' })
    @IsOptional()
    @IsString()
    descripcion: string | null;

    @ApiProperty({ example: 'SUBEC', maxLength: 100 })
    @IsNotEmpty({message: 'el codigo para las subcategorias en obligatorio'})
    @IsString({ message: 'El codigo debe ser un texto' })
    codigoSubCategoria: string;


    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @IsString({message: 'El usuario debe ser un string' })
    usuarioRegistro: string;
}

export class subCategoriaDTO {
    @ApiProperty({ example: 'Dispositivos Electronicos' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser un texto' })
    nombre: string;

    @ApiProperty({ example: 'SUBEC001', maxLength: 100 })
    @IsNotEmpty({message: 'el codigo es en obligatorio'})
    @IsString({ message: 'El codigo debe ser un texto' })
    codigoSubCategoria: string;

    @ApiProperty({ example: 'Laptops, pc, tablets, telefono...' })
    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto' })
    descripcion: string | null;

    @ApiProperty({ maxLength: 50 })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @IsString({message: 'El usuario debe ser un string' })
    usuarioRegistro: string;

    @ApiProperty({ minLength: 1 })
    @IsNotEmpty({ message: 'El id de la categoria es obligatorio' })
    @IsNumber()
    idCategoria: number
}