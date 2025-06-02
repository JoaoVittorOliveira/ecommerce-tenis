package br.unitins.joaovittor.basqueteiros.ViaCEP.resource;

import br.unitins.joaovittor.basqueteiros.ViaCEP.service.FreteService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/frete")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FreteResource {

    @Inject
    FreteService freteService;

    @GET
    @Path("/{cep}")
    public Response calcularFrete(@PathParam("cep") String cep) {
        return Response.ok(freteService.calcularFrete(cep)).build();
    }
}
