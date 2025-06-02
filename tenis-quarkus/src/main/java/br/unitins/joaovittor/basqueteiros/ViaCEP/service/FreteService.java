package br.unitins.joaovittor.basqueteiros.ViaCEP.service;

import br.unitins.joaovittor.basqueteiros.ViaCEP.dto.FreteResponseDTO;

public interface FreteService {

    FreteResponseDTO calcularFrete(String cep);
}