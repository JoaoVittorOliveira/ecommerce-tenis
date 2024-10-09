package br.unitins.joaovittor.basqueteiros.Material.dto;

import br.unitins.joaovittor.basqueteiros.Material.model.Material;

public record MaterialResponseDTO (
    Long id,
    String descricao,
    String categoria
){
    
    public static MaterialResponseDTO valueof(Material material){
        return new MaterialResponseDTO(
            material.getId(),
            material.getDescricao(),
            material.getCategoria()
        );
    }

}