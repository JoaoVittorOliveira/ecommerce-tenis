package br.unitins.joaovittor.basqueteiros.ViaCEP.client;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import br.unitins.joaovittor.basqueteiros.ViaCEP.dto.CepResponseDTO;

@Path("/ws")
@RegisterRestClient(configKey = "viacep-api")
public interface ViaCepClient {

    @GET
    @Path("/{cep}/json/")
    CepResponseDTO buscarCep(@PathParam("cep") @NotBlank @Pattern(regexp = "\\d{8}") String cep);
}