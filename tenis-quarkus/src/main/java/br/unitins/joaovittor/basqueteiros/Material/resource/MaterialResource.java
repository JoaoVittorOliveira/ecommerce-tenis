package br.unitins.joaovittor.basqueteiros.Material.resource;

import org.jboss.logging.Logger;

import br.unitins.joaovittor.basqueteiros.Cor.resource.CorResource;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialDTO;
import br.unitins.joaovittor.basqueteiros.Material.service.MaterialService;
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

@Path("/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MaterialResource {
    
    @Inject
    MaterialService service;

    private static final Logger LOG = Logger.getLogger(CorResource.class);

    @POST
    public Response create(MaterialDTO dto){
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
    public Response update( @PathParam("id") Long id, MaterialDTO dto){
        LOG.info("Executando update");
        LOG.debugf("New DTO: %s", dto);
        service.update(id, dto);
        return Response.status(Status.NO_CONTENT).build();
    }

    @GET
    public Response findAll(){
        LOG.info("Executando o findAll");
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/search/id/{id}")
    public Response findById( @PathParam("id") Long id){
        LOG.infof("Executando o metodo findById. Id: %s", id.toString());
        return Response.ok(service.findById(id)).build();
    }

    @GET
    @Path("/search/descricao/{descricao}")
    public Response findByDescricao( @PathParam("descricao") String descricao){
        LOG.infof("Executando o metodo findByDescricao. Descricao: %s", descricao.toString());
        return Response.ok(service.findByDescricao(descricao)).build();
    }
}
