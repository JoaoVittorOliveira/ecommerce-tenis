package br.unitins.joaovittor.basqueteiros.Tamanho.dto;

import jakarta.validation.constraints.NotBlank;

public record TamanhoDTO(

    Integer numeracao,

    @NotBlank(message = "o 'tamanho em cm' não pode ser nula ou vazia")
    String tamanhoEmCm,

    @NotBlank(message = "o país não pode ser nulo ou vazio") 
    String pais
) { }
