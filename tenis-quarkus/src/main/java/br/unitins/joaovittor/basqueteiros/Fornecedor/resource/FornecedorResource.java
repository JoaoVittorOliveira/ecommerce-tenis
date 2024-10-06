package br.unitins.joaovittor.basqueteiros.Fornecedor.resource;

import br.unitins.joaovittor.basqueteiros.Fornecedor.dto.FornecedorDTO;
import br.unitins.joaovittor.basqueteiros.Fornecedor.service.FornecedorService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/fornecedores")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed("Funcionario")
public class FornecedorResource {

    @Inject
    public FornecedorService service;

    @POST
    public Response create(FornecedorDTO dto) {
        return Response.ok(service.create(dto)).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, FornecedorDTO dto) {
        service.update(id, dto);
        return Response.status(Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        if(service.delete(id))
            return Response.status(Status.NO_CONTENT).build();
        return Response.status(Status.NOT_FOUND).build();
    }

    @GET
    public Response findAll() {
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/search/id/{id}")
    public Response findById(@PathParam("id") Long id){
        if(service.findById(id) != null)
            return Response.ok(service.findById(id)).build();
        return Response.status(Status.NOT_FOUND).build();
    }

    @GET
    @Path("/search/nome_empresa/{nome_empresa}")
    public Response findByNome(@PathParam("nome_empresa") String nomeEmpresa) {
        if(service.findByNomeEmpresa(nomeEmpresa) != null)
            return Response.ok(service.findByNomeEmpresa(nomeEmpresa)).build();
        return Response.status(Status.NOT_FOUND).build();
    }

}
