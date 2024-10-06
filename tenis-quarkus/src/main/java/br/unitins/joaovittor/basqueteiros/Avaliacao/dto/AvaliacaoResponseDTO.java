package br.unitins.joaovittor.basqueteiros.Avaliacao.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Avaliacao.model.Avaliacao;

public record AvaliacaoResponseDTO (
    Long id,
    String comentario,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao 
){
    public static AvaliacaoResponseDTO valueof(Avaliacao avaliacao) {
        return new AvaliacaoResponseDTO(
                                    avaliacao.getId(), 
                                    avaliacao.getComentario(),
                                    avaliacao.getDataCadastro(),
                                    avaliacao.getDataAlteracao());
    }
}
