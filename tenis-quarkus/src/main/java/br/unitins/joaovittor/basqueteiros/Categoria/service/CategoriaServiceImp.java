package br.unitins.joaovittor.basqueteiros.Categoria.service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<CategoriaResponseDTO> findAll(int page, int pageSize) {
        List<Categoria> list = repository
        .findAll()
        .page(page,pageSize)
        .list();
        return list.stream()
         .map(e -> CategoriaResponseDTO.valueof(e)).collect(Collectors.toList());
    }

    @Override
    public List<CategoriaResponseDTO> findAll(){
        List<Categoria> lista = repository.findAll().list();
        return lista.stream().map(e -> CategoriaResponseDTO.valueof(e)).toList();
    }

    @Override
    public long count(){
        return repository.count();
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
        List<Categoria> listCategoria = repository
                                    .findByNome(nome)
                                    .list();
        return listCategoria
                    .stream()
                    .map(e -> CategoriaResponseDTO.valueof(e))
                    .toList();
    }
    @Override
    public List<CategoriaResponseDTO> findByNome(int page, int pageSize, String nome) {
        List<Categoria> listCategoria = repository
                                    .findByNome(nome)
                                    .page(page, pageSize)
                                    .list();
        return listCategoria
                    .stream()
                    .map(e -> CategoriaResponseDTO.valueof(e))
                    .toList(); 
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
