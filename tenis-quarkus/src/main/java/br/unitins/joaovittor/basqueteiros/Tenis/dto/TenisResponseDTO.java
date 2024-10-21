package br.unitins.joaovittor.basqueteiros.Tenis.dto;

import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cor.dto.CorResponseDTO;
import br.unitins.joaovittor.basqueteiros.Marca.dto.MarcaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialResponseDTO;
import br.unitins.joaovittor.basqueteiros.Tamanho.dto.TamanhoResponseDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.model.Tenis;

public record TenisResponseDTO(
    Long id,
    String nome,
    int quantidade,
    Double peso,
    Double precoCompra,
    Double precoVenda,
    MarcaResponseDTO marca,
    MaterialResponseDTO material, 
    CorResponseDTO cor,
    CategoriaResponseDTO categoria,
    TamanhoResponseDTO tamanho
) 
    {
        public static TenisResponseDTO valueOf(Tenis tenis){
            return new TenisResponseDTO(tenis.getId(), 
                                        tenis.getNome(), 
                                        tenis.getQuantidade(), 
                                        tenis.getPeso(), 
                                        tenis.getPrecoCompra(), 
                                        tenis.getPrecoVenda(), 
                                        MarcaResponseDTO.valueof(tenis.getMarca()), 
                                        MaterialResponseDTO.valueof(tenis.getMaterial()), 
                                        CorResponseDTO.valueof(tenis.getCor()), 
                                        CategoriaResponseDTO.valueof(tenis.getCategoria()), 
                                        TamanhoResponseDTO.valueof(tenis.getTamanho()));
        }
    } 