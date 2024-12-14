package br.unitins.joaovittor.basqueteiros.Comentarios.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteResponseDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioResponseDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.model.Comentario;
import jakarta.validation.Valid;

public interface ComentarioService {
    
    public boolean delete(Long id);
    public List<ComentarioDTO> buscarComentariosPorTenis(Long idTenis);    
    public ComentarioResponseDTO adicionarComentario(@Valid ComentarioDTO dto);
}
