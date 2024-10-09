package br.unitins.joaovittor.basqueteiros.Cor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CorDTO(
    @NotBlank(message = "O nome não pode ser nulo ou vazio")
    String nome,

    @Size(min = 7, max = 7)
    @NotBlank(message = "O Codigo Hex não pode ser nulo ou vazio")
    String codigoHex
) {}
