package br.unitins.joaovittor.basqueteiros.Material.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MaterialDTO(
    
    @NotBlank(message = "A descricao não pode ser nulo ou vazio")
    @Size(min = 2, max = 30, message = "O tamanho do descricao deve ser de, pelo menos, 2 caracteres.")
    String descricao, 
    
    @NotBlank(message = "A categoria de material não pode ser nulo ou vazio")
    String categoria
) {
    
}
