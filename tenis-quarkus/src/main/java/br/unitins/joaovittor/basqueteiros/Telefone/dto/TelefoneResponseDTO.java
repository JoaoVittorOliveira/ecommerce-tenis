package br.unitins.joaovittor.basqueteiros.Telefone.dto;

import br.unitins.joaovittor.basqueteiros.Telefone.model.Telefone;

public record TelefoneResponseDTO (
    String ddd,
    String numero
){
    
    public static TelefoneResponseDTO valueof(Telefone telefone){
        return new TelefoneResponseDTO(
            telefone.getDdd(),
            telefone.getNumero()
        );
    }

}