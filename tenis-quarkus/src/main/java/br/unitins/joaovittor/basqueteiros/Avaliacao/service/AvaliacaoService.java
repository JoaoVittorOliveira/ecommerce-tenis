package br.unitins.joaovittor.basqueteiros.Avaliacao.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Avaliacao.dto.AvaliacaoDTO;
import br.unitins.joaovittor.basqueteiros.Avaliacao.dto.AvaliacaoResponseDTO;
import jakarta.validation.Valid;

public interface AvaliacaoService {
    
    public AvaliacaoResponseDTO create(@Valid AvaliacaoDTO dto);
    public void update(Long id, AvaliacaoDTO dto);
    public boolean delete(Long id);
    public List<AvaliacaoResponseDTO> findAll();
    public AvaliacaoResponseDTO findById(Long id);
    public List<AvaliacaoResponseDTO> findByComentario(String comentario);
}
