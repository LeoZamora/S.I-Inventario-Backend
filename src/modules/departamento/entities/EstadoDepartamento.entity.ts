import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "../../catalog/entities/Estados.entity";
import { Departamento } from "./Departamento.entity";

@Index("IX_EstadoDepartamento_Departamento", ["idDepartamento"], {})
@Index("IX_EstadoDepartamento_Estados", ["idEstado"], {})
@Index("PK_EstadoDepartamento", ["idEstadoDepartamento"], { unique: true })
@Entity("EstadoDepartamento", { schema: "dbo" })
export class EstadoDepartamento {
  @PrimaryGeneratedColumn({ type: "int", name: "idEstadoDepartamento" })
  idEstadoDepartamento: number;

  @Column("varchar", { name: "observaciones", nullable: true, length: 300 })
  observaciones: string | null;

  @Column("datetime2", { name: "fechaAsignacion", default: () => "getdate()" })
  fechaAsignacion: Date;

  @Column("varchar", { name: "usuarioRegistro", length: 50 })
  usuarioRegistro: string;

  @Column("int", { name: "idEstado" })
  idEstado: number;

  @Column("int", { name: "idDepartamento" })
  idDepartamento: number;

  @ManyToOne(() => Estados, (estados) => estados.estadoDepartamentos)
  @JoinColumn([{ name: "idEstado", referencedColumnName: "idEstado" }])
  estados: Estados;

  @ManyToOne(
    () => Departamento,
    (departamento) => departamento.estadoDepartamentos
  )
  @JoinColumn([
    { name: "idDepartamento", referencedColumnName: "idDepartamento" },
  ])
  departamento: Departamento;
}
