package br.unitins.joaovittor.basqueteiros.Cliente.resource;

import org.jboss.logging.Logger;

import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteAddEnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClientePasswordUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUsernameUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.service.ClienteService;
import br.unitins.joaovittor.basqueteiros.Jwt.service.JwtService;
import br.unitins.joaovittor.basqueteiros.Usuario.repository.UsuarioRepository;
import br.unitins.joaovittor.basqueteiros.Usuario.service.UsuarioService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.core.Response.Status;
import jakarta.xml.bind.ValidationException;

@Path("/clientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClienteResource {
    
    @Inject
    ClienteService service;

    @Inject
    UsuarioService usuarioService;

    @Inject
    UsuarioRepository usuarioRepository;

    @Inject
    JwtService jwtService;

    @Context 
    SecurityContext securityContext;

    private static final Logger LOG = Logger.getLogger(ClienteResource.class);

    @POST
    // Deixar sem nada?
    // @RolesAllowed("Funcionario")
    public Response create(ClienteDTO dto){
        return Response.ok(service.create(dto)).build();
    }

    @DELETE
    @Path("/{id}")
    //@RolesAllowed("Funcionario")
    public Response delete( @PathParam("id") Long id){
        if(service.delete(id))
            return Response.status(Status.NO_CONTENT).build();
        return Response.status(Status.NOT_FOUND).build();
    }

    @PUT
    @Path("/{id}")
    //@RolesAllowed("Funcionario")
    public Response update( @PathParam("id") Long id, ClienteUpdateDTO dto){
        try {
            service.update(id, dto);
        } catch (ValidationException e) {
            LOG.warnf("Erro de validação", e.getMessage());
        }
        return Response.status(Status.NO_CONTENT).build();
    }

    @GET
    @Path("/my-account")
    //@RolesAllowed("Cliente")
    public Response getMyAccount() {
        try {
            return Response.ok(service.getMyAccount()).build();
        } catch (EntityNotFoundException e) {
            LOG.error("Cliente não encontrado.", e);
            return Response.status(Status.NOT_FOUND).entity("Cliente não encontrado.").build();
        } catch (Exception e) {
            LOG.error("Erro ao buscar conta.", e);
            
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar conta. "+ e).build();
        }
    }

    @PUT
    @Path("/my-account")
    //@RolesAllowed("Cliente")
    public Response updateMyAccount(ClienteUpdateDTO dto) {
        try {
            service.updateMyAccount(dto);
            return Response.noContent().build();
        } catch (EntityNotFoundException e) {
            LOG.error("Cliente não encontrado.", e);
            return Response.status(Status.NOT_FOUND).entity("Cliente não encontrado.").build();
        } catch (Exception e) {
            LOG.error("Erro ao atualizar conta.", e);
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao atualizar conta. "+ e).build();
        }
    }

    @PATCH
    //@RolesAllowed("Cliente")
    @Path("/update-password")
    public Response updateUsuarioPassword(ClientePasswordUpdateDTO passwordUpdateDTO){
        service.updateUsuarioPassword(passwordUpdateDTO);
        return Response.status(Status.NO_CONTENT).build();
    }

    @PATCH
    //@RolesAllowed("Cliente")
    @Path("/update-username")
    public Response updateUsuarioUsername(ClienteUsernameUpdateDTO usernameUpdateDTO){
        service.updateUsuarioUsername(usernameUpdateDTO);
        return Response.status(Status.NO_CONTENT).build();
    }

    @PATCH
    @Path("/add-endereco/{id}")
    public Response addEndereco(@PathParam("id") Long idCliente, ClienteAddEnderecoDTO dto){
        service.addEndereco(idCliente, dto);
        return Response.status(Status.NO_CONTENT).build();
    }

    @GET
    //@RolesAllowed({"Funcionario", "Cliente"})
    public Response findAll(){
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/search/{id}/enderecos")
    //@RolesAllowed({"Funcionario", "Cliente"})
    public Response findAllEnderecosById( @PathParam("id") Long id ){
        return Response.ok(service.findAllEnderecosById(id)).build();
    }

    @GET
    @Path("/search/id/{id}")
    //@RolesAllowed("Funcionario")
    public Response findById( @PathParam("id") Long id){
        return Response.ok(service.findById(id)).build();
    }

    @GET
    @Path("/search/nome/{nome}")
    //@RolesAllowed("Funcionario")
    public Response findByNome( @PathParam("nome") String nome){
        // service.findByNome(nome);
        return Response.ok(service.findByNome(nome)).build();
    }

    @GET
    @Path("/search/cpf/{cpf}")
    //@RolesAllowed("Funcionario")
    public Response findByCpf( @PathParam("cpf") String cpf){
        // service.findByNome(nome);
        return Response.ok(service.findByCpf(cpf)).build();
    }

    @GET
    @Path("/search/username/{username}")
    //@RolesAllowed("Funcionario")
    public Response findByUsername( @PathParam("username") String username){
        return Response.ok(service.findByUsername(username)).build();
    }
}
