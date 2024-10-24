package br.unitins.joaovittor.basqueteiros.Categoria.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaDTO(
    @NotBlank(message = "O nome não pode ser nulo ou vazio")
    String nome,

    @Size(min = 10, max = 200)
    @NotBlank(message = "A descrição não pode ser nulA ou vazia")
    String descricao,

    @NotBlank(message = "O gênero não pode ser nulo ou vazio")
    String genero,

    @NotBlank(message = "A faixa etaria não pode ser nulA ou vazia")
    String faixaEtaria
) {}
