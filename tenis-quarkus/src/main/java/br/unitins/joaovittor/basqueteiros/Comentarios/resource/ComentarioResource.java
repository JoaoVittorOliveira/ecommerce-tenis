package br.unitins.joaovittor.basqueteiros.Comentarios.resource;

import java.util.List;

import org.jboss.logging.Logger;

import br.unitins.joaovittor.basqueteiros.Cor.resource.CorResource;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioResponseDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.model.Comentario;
import br.unitins.joaovittor.basqueteiros.Comentarios.service.ComentarioService;
// import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response.Status;
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

@Path("/comentarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
// ?? @RolesAllowed("Funcionario")
public class ComentarioResource {
    
    @Inject
    public ComentarioService service;

    private static final Logger LOG = Logger.getLogger(CorResource.class);

@POST
public Response create(ComentarioDTO dto) {
    LOG.info("Executando o create");
    LOG.debugf("DTO recebido: %s", dto);

    try {
        ComentarioResponseDTO response = service.adicionarComentario(dto);
        return Response.ok(response).build();
    } catch (Exception e) {
        LOG.error("Erro ao criar comentário", e);
        return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao criar comentário").build();
    }
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

    @GET
    @Path("/{idTenis}")
    public List<ComentarioDTO> buscarComentariosPorTenis(@PathParam("idTenis") Long idTenis) {
        return service.buscarComentariosPorTenis(idTenis);
    }

}
