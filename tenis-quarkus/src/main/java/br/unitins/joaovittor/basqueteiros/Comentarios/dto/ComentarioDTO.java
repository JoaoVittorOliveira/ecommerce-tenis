package br.unitins.joaovittor.basqueteiros.Comentarios.dto;

import java.time.LocalDateTime;

public record ComentarioDTO (

    Long id,
    Long idTenis,
    String usuario,
    String texto,
    LocalDateTime data

    
){}