package br.unitins.joaovittor.basqueteiros.Cupom.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import br.unitins.joaovittor.basqueteiros.Cupom.model.Cupom;

public record CupomResponseDTO (
    Long id,
    String codigo,
    Integer porcentagemDesconto,
    Double valorDesconto,
    LocalDate dataVencimento,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao    
){
    public static CupomResponseDTO valueof(Cupom cupom) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return new CupomResponseDTO(
                                    cupom.getId(), 
                                    cupom.getCodigo(),
                                    cupom.getPorcentagemDesconto(),
                                    cupom.getValorDesconto(),
                                    cupom.getDataVencimento(),
                                    cupom.getDataCadastro(),
                                    cupom.getDataAlteracao());
    }
}
