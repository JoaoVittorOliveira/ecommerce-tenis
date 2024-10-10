package br.unitins.joaovittor.basqueteiros.Marca.dto;

import br.unitins.joaovittor.basqueteiros.Marca.model.Marca;

public record MarcaResponseDTO (
    Long id,
    String nome,
    String logo  
){
    public static MarcaResponseDTO valueof(Marca marca) {
        return new MarcaResponseDTO(
                                    marca.getId(), 
                                    marca.getNome(),
                                    marca.getLogo());
    }
}
