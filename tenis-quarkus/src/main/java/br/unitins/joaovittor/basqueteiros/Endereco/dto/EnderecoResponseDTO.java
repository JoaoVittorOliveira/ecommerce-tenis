package br.unitins.joaovittor.basqueteiros.Endereco.dto;

import br.unitins.joaovittor.basqueteiros.Endereco.model.Endereco;

public record EnderecoResponseDTO (
    Long id,
    String cep,
    String rua,
    String complemento
){
    
    public static EnderecoResponseDTO valueof(Endereco endereco){
        return new EnderecoResponseDTO(
            endereco.getId(),
            endereco.getCep(),
            endereco.getRua(),
            endereco.getComplemento()
        );
    }

}