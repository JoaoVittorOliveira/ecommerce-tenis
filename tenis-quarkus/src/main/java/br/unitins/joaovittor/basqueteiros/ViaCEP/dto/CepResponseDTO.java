package br.unitins.joaovittor.basqueteiros.ViaCEP.dto;

public record CepResponseDTO (
    String cep,
    String logradouro,
    String complemento,
    String bairro,
    String localidade,
    String uf,
    String ibge,
    String gia,
    String ddd,
    String siafi,
    Boolean erro
) {
}
