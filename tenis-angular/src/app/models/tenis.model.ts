import { Categoria } from "./categoria.model";
import { Cor } from "./cor.model";
import { Marca } from "./marca.model";
import { Material } from "./material.model";
import { Tamanho } from "./tamanho.model";

export class Tenis {
    id!: number;
    nome!: string;
    quantidade!: number;
    peso!: number;
    precoCompra!: number;
    precoVenda!: number;
    marca!: Marca;
    material!: Material;
    cor!: Cor;
    categoria!: Categoria;
    tamanho!: Tamanho;
    nomeImagem!: string;
}