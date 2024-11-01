import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";
import { Usuario } from "./usuario.model";

export class Funcionario {
    id!: number;
    nome!: string;
    cpf!: string;
    codigoAdmissao!: string;
    dataAdmissao!: Date;
    dataNascimento!: Date;
    telefone!: Telefone;
    usuario!: Usuario;
}
