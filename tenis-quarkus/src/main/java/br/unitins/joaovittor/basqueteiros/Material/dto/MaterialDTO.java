package br.unitins.joaovittor.basqueteiros.Material.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MaterialDTO(
    
    @NotBlank(message = "A descricao não pode ser nula ou vazia")
    @Size(min = 2, max = 60, message = "O tamanho do descricao deve ser de, pelo menos, 2 caracteres e no máximo 60.")
    String descricao, 
    
    @NotBlank(message = "A categoria de material não pode ser nula ou vazia")
    String categoria
) {
    
}
