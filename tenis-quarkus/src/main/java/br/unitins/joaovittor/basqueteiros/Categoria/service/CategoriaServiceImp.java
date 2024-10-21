package br.unitins.joaovittor.basqueteiros.Categoria.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaDTO;
import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Categoria.model.Categoria;
import br.unitins.joaovittor.basqueteiros.Categoria.repository.CategoriaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class CategoriaServiceImp implements CategoriaService {
    
    @Inject
    CategoriaRepository repository;

    @Override
    @Transactional
    public CategoriaResponseDTO create(@Valid CategoriaDTO dto) {
        Categoria categoria = new Categoria();

        categoria.setNome(dto.nome());
        categoria.setDescricao(dto.descricao());
        categoria.setGenero(dto.genero());
        categoria.setFaixaEtaria(dto.faixaEtaria());

        repository.persist(categoria);
        return CategoriaResponseDTO.valueof(categoria);
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, CategoriaDTO dto) {
        Categoria categoria = repository.findById(id);
        categoria.setNome(dto.nome());
        categoria.setDescricao(dto.descricao());
        categoria.setGenero(dto.genero());
        categoria.setFaixaEtaria(dto.faixaEtaria());
        
    }

    @Override
    public List<CategoriaResponseDTO> findAll() {
        return repository.findAll()
                                .stream()
                                .map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

    @Override
    public CategoriaResponseDTO findById(Long id) {

        Categoria categoria = repository.findById(id);

        if(categoria != null)
            return CategoriaResponseDTO.valueof(repository.findById(id));
        return null;       
    }

    @Override
    public List<CategoriaResponseDTO> findByNome(String nome) {
        return repository.findByNome(nome)
                         .stream()
                         .map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

    @Override
    public CategoriaResponseDTO findByNomeCompleto(String nome) {
        return CategoriaResponseDTO.valueof(repository.findByNomeCompleto(nome));
    }

    @Override
    public List<CategoriaResponseDTO> findByDescricao(String descricao) {
        return repository.findByDescricao(descricao)
                         .stream()
                         .map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

    @Override
    public List<CategoriaResponseDTO> findByGenero(String genero) {
        return repository.findByGenero(genero)
                         .stream()
                         .map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

    @Override
    public List<CategoriaResponseDTO> findByFaixaEtaria(String faixaEtaria) {
       return repository.findByFaixaEtaria(faixaEtaria)
                         .stream()
                         .map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

}
