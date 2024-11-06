import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";
import { Usuario } from "./usuario.model";

export class Cliente {
    id!: number;
    nome!: string;
    cpf!: string;
    dataNascimento!: Date;
    telefone!: Telefone;
    usuario!: Usuario;
    endereco!: Endereco;
}
