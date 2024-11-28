import { Cliente } from "./cliente.model";
import { Funcionario } from "./funcionario.model";

export class Usuario {
    id!: number;
    username!: string;
    senha!: string;
    perfil!: string;
    cliente?: Cliente; 
    funcionario?: Funcionario; 
}
