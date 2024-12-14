package br.unitins.joaovittor.basqueteiros.Comentarios.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.model.Cliente;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.dto.ComentarioResponseDTO;
import br.unitins.joaovittor.basqueteiros.Comentarios.model.Comentario;
import br.unitins.joaovittor.basqueteiros.Comentarios.repository.ComentarioRepository;
import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Endereco.model.Endereco;
import br.unitins.joaovittor.basqueteiros.Telefone.model.Telefone;
import br.unitins.joaovittor.basqueteiros.Usuario.model.Usuario;
import br.unitins.joaovittor.basqueteiros.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class ComentarioServiceImp implements ComentarioService{

    @Inject
    ComentarioRepository repository;



    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    // Busca os comentários e transforma para DTO
    public List<ComentarioDTO> buscarComentariosPorTenis(Long idTenis) {
        return repository.findByIdTenisOrderByDataDesc(idTenis)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }



     @Override
    @Transactional
    public ComentarioResponseDTO adicionarComentario(@Valid ComentarioDTO dto) {

        Comentario comentario = new Comentario();
        comentario.setIdTenis(dto.idTenis());
    comentario.setUsuario(dto.usuario());
    comentario.setTexto(dto.texto());
    comentario.setData(dto.data()); 
        repository.persistAndFlush(comentario);
        return ComentarioResponseDTO.valueof(comentario);

    }

    // Método para transformar entidade em DTO
    private ComentarioDTO toDTO(Comentario comentario) {
        return new ComentarioDTO(
                comentario.getId(),
                comentario.getIdTenis(),
                comentario.getUsuario(),
                comentario.getTexto(),
                comentario.getData()
        );
    }
}
