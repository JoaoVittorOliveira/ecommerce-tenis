package br.unitins.joaovittor.basqueteiros.Tenis.dto;

public record TenisDTO(
    String nome,
    int quantidade,
    Double peso,
    Double precoCompra,
    Double precoVenda,
    Long idMarca,
    Long idMaterial, 
    Long idCor,
    Long idCategoria,
    Long idTamanho
) { }
