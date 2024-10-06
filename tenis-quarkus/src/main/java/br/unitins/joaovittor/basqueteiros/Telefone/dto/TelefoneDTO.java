package br.unitins.joaovittor.basqueteiros.Telefone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TelefoneDTO(
    
    @NotBlank(message = "O ddd não pode ser nulo ou vazio")
    @Size(min = 2, max = 2, message = "O tamanho do ddd deve ser de 2 caracteres.")
    String ddd,
    
    @NotBlank(message = "O núemro de telefone não pode ser nulo ou vazio")
    String numero
) {
    
}
