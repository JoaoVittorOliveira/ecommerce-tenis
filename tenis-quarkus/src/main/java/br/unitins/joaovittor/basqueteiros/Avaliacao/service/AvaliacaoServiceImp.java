package br.unitins.joaovittor.basqueteiros.Avaliacao.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Avaliacao.dto.AvaliacaoDTO;
import br.unitins.joaovittor.basqueteiros.Avaliacao.dto.AvaliacaoResponseDTO;
import br.unitins.joaovittor.basqueteiros.Avaliacao.model.Avaliacao;
import br.unitins.joaovittor.basqueteiros.Avaliacao.repository.AvaliacaoRepository;
import br.unitins.joaovittor.basqueteiros.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class AvaliacaoServiceImp implements AvaliacaoService{

    @Inject
    AvaliacaoRepository repository;

    @Override
    @Transactional
    public AvaliacaoResponseDTO create(@Valid AvaliacaoDTO dto) {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setComentario(dto.comentario());

        repository.persist(avaliacao);
        return AvaliacaoResponseDTO.valueof(avaliacao);
    }

    public void verificarComentario(String comentario){
        Avaliacao avaliacao = repository.findByComentarioCompleto(comentario);
        if(avaliacao != null)
            throw new ValidationException("comentario", "O comentario '"+comentario+"' ja foi utilizado");
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, AvaliacaoDTO dto) {
        Avaliacao avaliacao = repository.findById(id);
        avaliacao.setComentario(dto.comentario());
        
    }

    @Override
    public List<AvaliacaoResponseDTO> findAll() {
        return repository.findAll()
                                .stream()
                                .map(e -> AvaliacaoResponseDTO.valueof(e)).toList();
    }

    @Override
    public AvaliacaoResponseDTO findById(Long id) {
        Avaliacao avaliacao = repository.findById(id);
        if(avaliacao != null)
            return AvaliacaoResponseDTO.valueof(avaliacao);
        return null;
    }

    @Override
    public List<AvaliacaoResponseDTO> findByComentario(String comentario) {
        return repository.findByComentario(comentario)
                                        .stream()
                                        .map(e -> AvaliacaoResponseDTO.valueof(e)).toList();
    }
    
}
