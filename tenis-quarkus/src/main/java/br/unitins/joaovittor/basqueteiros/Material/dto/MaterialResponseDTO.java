package br.unitins.joaovittor.basqueteiros.Material.dto;

import br.unitins.joaovittor.basqueteiros.Material.model.Material;

public record MaterialResponseDTO (
    String descricao,
    String categoria
){
    
    public static MaterialResponseDTO valueof(Material material){
        return new MaterialResponseDTO(
            material.getDescricao(),
            material.getCategoria()
        );
    }

}