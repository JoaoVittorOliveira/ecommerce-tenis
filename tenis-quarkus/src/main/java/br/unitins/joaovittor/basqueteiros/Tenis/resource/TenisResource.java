package br.unitins.joaovittor.basqueteiros.Tenis.resource;

import org.jboss.logging.Logger;

import br.unitins.joaovittor.basqueteiros.Cor.resource.CorResource;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisResponseDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.service.TenisService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/tenis")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TenisResource {

    @Inject
    public TenisService service;

    private static final Logger LOG = Logger.getLogger(CorResource.class);

    @POST
    //@RolesAllowed("Cliente")
    public Response create(TenisDTO dto){
        LOG.info("Executando o create");
        LOG.debugf("DTO: %s", dto);
        return Response.ok(service.create(dto)).build(); 
    }

    @GET
    //@RolesAllowed("Funcionario")
    public Response findAll(){
        LOG.info("Executando o findAll");
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/search/id/{id}")
    //@RolesAllowed("Funcionario")
    public Response findById( @PathParam("id") Long id){
        LOG.infof("Executando o metodo findById. Id: %s", id.toString());
        if(service.findById(id) != null)
            return Response.ok(service.findById(id)).build();
        return Response.status(Status.NOT_FOUND).build();
    }

    @DELETE
    @Path("/{id}")
    //@RolesAllowed("Funcionario")
    public Response delete(@PathParam("id") Long id) {
        if(service.delete(id))
            return Response.status(Status.NO_CONTENT).build();
        return Response.status(Status.NOT_FOUND).build();
    }
    
}
