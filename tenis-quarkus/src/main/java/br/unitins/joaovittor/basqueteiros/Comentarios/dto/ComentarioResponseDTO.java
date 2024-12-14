package br.unitins.joaovittor.basqueteiros.Comentarios.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Comentarios.model.Comentario;

public record ComentarioResponseDTO (

Long id,
Long idTenis,
String usuario,
String texto,
LocalDateTime data 
){
    public static ComentarioResponseDTO valueof(Comentario comentario) {
        return new ComentarioResponseDTO(
                                    comentario.getId(),
                                    comentario.getIdTenis(),
                                    comentario.getUsuario(),
                                    comentario.getTexto(),
                                    comentario.getData());
    }
}
