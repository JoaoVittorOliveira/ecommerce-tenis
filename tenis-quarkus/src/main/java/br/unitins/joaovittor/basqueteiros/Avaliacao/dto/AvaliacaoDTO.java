package br.unitins.joaovittor.basqueteiros.Avaliacao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AvaliacaoDTO (

    @NotBlank(message = "O comentario não pode ser nulo ou vazio")
    @Size(max = 256, message = "O limite de caracteres eh de 256")
    String comentario
    
){ }
