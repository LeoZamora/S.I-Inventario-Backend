import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EstadoDepartamento } from "./EstadoDepartamento.entity";
import { Inventario } from "../../inventario/entities/Inventario.entity";

@Index("PK_Departamento", ["idDepartamento"], { unique: true })
@Index("UQ_codigoDepartamento", ["codigoDepartamento"], { unique: true })
@Entity("Departamento", { schema: "dbo" })
export class Departamento {
  @PrimaryGeneratedColumn({ type: "int", name: "idDepartamento" })
  idDepartamento: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 300 })
  descripcion: string | null;

  @Column("nvarchar", { name: "codigoDepartamento", unique: true, length: 50 })
  codigoDepartamento: string;

  @Column("varchar", { name: "nombreDepartamento", length: 100 })
  nombreDepartamento: string;

  @Column("datetime2", { name: "fechaRegistro", default: () => "getdate()" })
  fechaRegistro: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @OneToMany(
    () => EstadoDepartamento,
    (estadoDepartamento) => estadoDepartamento.departamento
  )
  estadoDepartamentos: EstadoDepartamento[];

  @OneToMany(() => Inventario, (inventario) => inventario.departamento)
  inventarios: Inventario[];
}
