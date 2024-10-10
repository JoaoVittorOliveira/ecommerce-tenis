package br.unitins.joaovittor.basqueteiros.Cupom.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Cupom.model.Cupom;

public record CupomResponseDTO (
    Long id,
    String codigo,
    Integer porcentagemDesconto,
    Double valorDesconto,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao    
){
    public static CupomResponseDTO valueof(Cupom cupom) {
        return new CupomResponseDTO(
                                    cupom.getId(), 
                                    cupom.getCodigo(),
                                    cupom.getPorcentagemDesconto(),
                                    cupom.getValorDesconto(),
                                    cupom.getDataCadastro(),
                                    cupom.getDataAlteracao());
    }
}
