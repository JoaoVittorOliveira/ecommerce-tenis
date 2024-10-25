package br.unitins.joaovittor.basqueteiros.Material.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialDTO;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialResponseDTO;
import jakarta.validation.Valid;

public interface MaterialService {

    public MaterialResponseDTO create(@Valid MaterialDTO dto);
    public void update(Long id, MaterialDTO dto);
    public boolean delete(Long id);
    public List<MaterialResponseDTO> findAll(int page, int pageSize);
    public MaterialResponseDTO findById(Long id);
    public List<MaterialResponseDTO> findByDescricao(String descricao);
    public List<MaterialResponseDTO> findByDescricao(int page, int pageSize, String nome);
    public MaterialResponseDTO findByCategoria(String categoria);
    public long count();

} 