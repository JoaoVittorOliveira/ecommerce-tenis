package br.unitins.joaovittor.basqueteiros.Material.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialDTO;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialResponseDTO;
import jakarta.validation.Valid;

public interface MaterialService {

    public MaterialResponseDTO create(@Valid MaterialDTO dto);
    public void update(Long id, MaterialDTO dto);
    public boolean delete(Long id);
    public List<MaterialResponseDTO> findAll();
    public MaterialResponseDTO findById(Long id);
    public MaterialResponseDTO findByDescricao(String descricao);
    public MaterialResponseDTO findByCategoria(String categoria);
} 