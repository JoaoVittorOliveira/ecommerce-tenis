package br.unitins.joaovittor.basqueteiros.ViaCEP.dto;

import java.math.BigDecimal;

public record FreteResponseDTO(
    String cep,
    String uf,
    BigDecimal valorFrete
) {}