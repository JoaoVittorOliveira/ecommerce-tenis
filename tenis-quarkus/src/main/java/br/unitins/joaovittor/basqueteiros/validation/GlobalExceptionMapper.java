package br.unitins.joaovittor.basqueteiros.validation;

import org.jboss.logging.Logger;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
@ApplicationScoped
public class GlobalExceptionMapper implements ExceptionMapper<org.jboss.resteasy.spi.UnhandledException> {

    private static final Logger LOG = Logger.getLogger(GlobalExceptionMapper.class);

    @Override
    public Response toResponse(org.jboss.resteasy.spi.UnhandledException exception) {
        
        // se for erro de constraint
        Throwable cause = exception.getCause();
        if (cause instanceof ConstraintViolationException) {
            return new DuplicateEntityExceptionMapper().toResponse((ConstraintViolationException) cause);
        }

        // se quiser colocar outros erros...

        // generico
        LOG.error("Erro não tratado: " + exception.getMessage());
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro interno do servidor").build();
    }
}