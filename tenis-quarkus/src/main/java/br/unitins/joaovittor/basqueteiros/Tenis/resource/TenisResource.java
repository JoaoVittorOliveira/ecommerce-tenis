package br.unitins.joaovittor.basqueteiros.Tenis.resource;

import org.jboss.logging.Logger;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import br.unitins.joaovittor.basqueteiros.Cor.resource.CorResource;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.service.TenisFileServiceImpl;
import br.unitins.joaovittor.basqueteiros.Tenis.service.TenisService;
import br.unitins.joaovittor.basqueteiros.form.ImageForm;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/tenis")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TenisResource {

    @Inject
    public TenisService service;

    @Inject
    public TenisFileServiceImpl fileService;

    private static final Logger LOG = Logger.getLogger(CorResource.class);

    @POST
    //@RolesAllowed("Cliente")
    public Response create(TenisDTO dto){
        LOG.info("Executando o create");
        LOG.debugf("DTO: %s", dto);
        return Response.ok(service.create(dto)).build(); 
    }

    @PUT
    @Path("/{id}")
    public Response update( @PathParam("id") Long id, TenisDTO dto){
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

    @PATCH
    @Path("/{id}/imagem/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    //@RolesAllowed("Funcionario")
    public Response upload(@PathParam("id") Long id, @MultipartForm ImageForm form) {
        fileService.upload(id, form.getNomeImagem(), form.getImagem());
        return Response.noContent().build();
    }

    @GET
    @Path("/image/download/{nomeImagem}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    //@RolesAllowed({"Cliente", "Funcionario"})
    public Response download(@PathParam("nomeImagem") String nomeImagem) {
        return Response.ok(fileService.download(nomeImagem))
               .header("Content-Disposition", "attachment;filename=" + nomeImagem).build();
    }
    
}
