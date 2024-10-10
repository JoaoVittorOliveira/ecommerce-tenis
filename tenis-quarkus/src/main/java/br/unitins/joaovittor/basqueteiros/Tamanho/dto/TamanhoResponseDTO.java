package br.unitins.joaovittor.basqueteiros.Tamanho.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Tamanho.model.Tamanho;

public record TamanhoResponseDTO(
    Long id,
    Integer numeracao,
    String tamanhoEmCm,
    String pais,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
) {
    public static TamanhoResponseDTO valueof(Tamanho tamanho){
        return new TamanhoResponseDTO(tamanho.getId(),
                                    tamanho.getNumeracao(), 
                                    tamanho.getTamanhoEmCm(), 
                                    tamanho.getPais(),
                                    tamanho.getDataCadastro(), 
                                    tamanho.getDataAlteracao());
    }
}
