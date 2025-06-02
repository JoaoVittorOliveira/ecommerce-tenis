package br.unitins.joaovittor.basqueteiros.ViaCEP.service;

import br.unitins.joaovittor.basqueteiros.ViaCEP.client.ViaCepClient;
import br.unitins.joaovittor.basqueteiros.ViaCEP.dto.CepResponseDTO;
import br.unitins.joaovittor.basqueteiros.ViaCEP.dto.FreteResponseDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.math.BigDecimal;

import org.eclipse.microprofile.rest.client.inject.RestClient;

@ApplicationScoped
public class FreteServiceImpl implements FreteService {

    @Inject
    @RestClient
    ViaCepClient viaCepClient;

    @Override
    public FreteResponseDTO calcularFrete(String cep) {
        CepResponseDTO endereco = viaCepClient.buscarCep(cep);

        if (Boolean.TRUE.equals(endereco.erro())) {
            throw new WebApplicationException("CEP inválido.", Response.Status.BAD_REQUEST);
        }

        BigDecimal valorFrete = switch (endereco.uf().toUpperCase()) {
            case "SP" -> new BigDecimal(25);
            case "RJ", "MG" -> new BigDecimal(15.0);
            default -> new BigDecimal(5.0);    
        };

        return new FreteResponseDTO(endereco.cep(), endereco.uf(), valorFrete);
    }
}

