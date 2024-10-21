package br.unitins.joaovittor.basqueteiros.Categoria.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaDTO;
import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaResponseDTO;
import jakarta.validation.Valid;

public interface CategoriaService {
    
    public CategoriaResponseDTO create(@Valid CategoriaDTO dto);
    public void update(Long id, CategoriaDTO dto);
    public boolean delete(Long id);
    public List<CategoriaResponseDTO> findAll();
    public CategoriaResponseDTO findById(Long id);
    public List<CategoriaResponseDTO> findByNome(String nome);
    public CategoriaResponseDTO findByNomeCompleto(String nome);
    public List<CategoriaResponseDTO> findByDescricao(String descricao);
    public List<CategoriaResponseDTO> findByGenero(String genero);
    public List<CategoriaResponseDTO> findByFaixaEtaria(String faixaEtaria);

}
