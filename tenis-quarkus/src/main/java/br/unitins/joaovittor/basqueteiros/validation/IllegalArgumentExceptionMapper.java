package br.unitins.joaovittor.basqueteiros.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jboss.logging.Logger;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
@ApplicationScoped
public class IllegalArgumentExceptionMapper implements ExceptionMapper<Throwable>{

    private static final Logger LOG = Logger.getLogger(IllegalArgumentExceptionMapper.class);

    @Override
    public Response toResponse(Throwable exception) {

        Throwable cause = exception;
        
        // Navega pela cadeia de exceções para encontrar a Exception que foi lançada
        while (cause != null) {

            if (cause instanceof IllegalArgumentException hibernateEx) {
                
                ValidationError validationError = new ValidationError("404", "usuario nao logado");
                
                String fieldName = extractFieldName(hibernateEx.getMessage());
                String message = "usuario nao logado";

                validationError.addFieldError(fieldName, message);
                LOG.error("Erro de 'not found': " + hibernateEx.getMessage());

                return Response.status(Response.Status.CONFLICT).entity(validationError).build();
            }
            else if (cause instanceof WebApplicationException){
                ValidationError validationError = new ValidationError("400", "Bad Request");
            
                String fieldName = "CEP";
                String message = "CEP mal informado (apenas 8 digitos)"; 

                validationError.addFieldError(fieldName, message);
                LOG.error("Erro de validação: " + exception.getMessage());

                return Response.status(Response.Status.BAD_REQUEST).entity(validationError).build();
            }
            cause = cause.getCause();

        }

        LOG.error("Erro não tratado: " + exception.getMessage());
        
        
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro interno do servidor").build();
    }

    private String extractFieldName(String errorMessage) {
        // Exemplo: busca o conteúdo entre parênteses após "Detalhe: Chave (campo)=..."
        Pattern pattern = Pattern.compile("Detalhe: Chave \\((.*?)\\)=");
        Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "campo_desconhecido"; // Fallback caso o campo não seja encontrado
    }

}
