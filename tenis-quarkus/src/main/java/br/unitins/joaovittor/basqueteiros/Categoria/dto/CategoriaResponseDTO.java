package br.unitins.joaovittor.basqueteiros.Categoria.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Categoria.model.Categoria;

public record CategoriaResponseDTO(
    Long id,
    String nome,
    String descricao,
    String genero,
    String faixaEtaria,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
) {
    public static CategoriaResponseDTO valueof(Categoria categoria){
        return new CategoriaResponseDTO(categoria.getId(), 
                                categoria.getNome(), 
                                categoria.getDescricao(),
                                categoria.getGenero(),
                                categoria.getFaixaEtaria(),
                                categoria.getDataCadastro(), 
                                categoria.getDataAlteracao());
    }
}
