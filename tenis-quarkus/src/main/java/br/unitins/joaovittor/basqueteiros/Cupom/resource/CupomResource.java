package br.unitins.joaovittor.basqueteiros.Cupom.resource;

import org.jboss.logging.Logger;
import br.unitins.joaovittor.basqueteiros.Cupom.dto.CupomDTO;
import br.unitins.joaovittor.basqueteiros.Cupom.service.CupomService;
// import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/cupons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
// @RolesAllowed("Funcionario")
public class CupomResource {
    
    @Inject
    public CupomService service;

    private static final Logger LOG = Logger.getLogger(CupomResource.class);

    @POST
    public Response create(CupomDTO dto){
        LOG.info("Executando o create");
        LOG.debugf("DTO: %s", dto);
        return Response.ok(service.create(dto)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete( @PathParam("id") Long id){
        LOG.info("Executando delete");
        LOG.info("ID informado: "+id);
        if(service.delete(id))
            return Response.status(Status.NO_CONTENT).build();
        return Response.status(Status.NOT_FOUND).build();
    }

    @PUT
    @Path("/{id}")
    public Response update( @PathParam("id") Long id, CupomDTO dto){
        LOG.info("Executando update");
        LOG.debugf("New DTO: %s", dto);
        service.update(id, dto);
        return Response.status(Status.NO_CONTENT).build();
    }

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") int page,
                            @QueryParam("pageSize") @DefaultValue("100") int pageSize) {
        return Response.ok(service.findAll(page, pageSize)).build();
    }

    @GET
    public Response findAll(){
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/search/id/{id}")
    public Response findById( @PathParam("id") Long id){
        LOG.infof("Executando o metodo findById. Id: %s", id.toString());
        return Response.ok(service.findById(id)).build();
    }

    @GET
    @Path("/search/codigo/{codigo}")
    public Response findByCodigo(@QueryParam("page") @DefaultValue("0") int page,
    @QueryParam("pageSize") @DefaultValue("100") int pageSize,
    @PathParam("codigo") String codigo) {
    return Response.ok(service.findByCodigo(page, pageSize, codigo)).build();
    }

    @GET
    @Path("/count")
    public long count(){
        return service.count();
    }
}
