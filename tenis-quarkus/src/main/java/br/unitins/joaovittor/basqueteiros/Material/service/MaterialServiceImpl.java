package br.unitins.joaovittor.basqueteiros.Material.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialResponseDTO;
import br.unitins.joaovittor.basqueteiros.Material.dto.MaterialDTO;
import br.unitins.joaovittor.basqueteiros.Material.model.Material;
import br.unitins.joaovittor.basqueteiros.Material.repository.MaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class MaterialServiceImpl implements MaterialService{

    @Inject
    MaterialRepository repository;

    @Override
    @Transactional
    public MaterialResponseDTO create(@Valid MaterialDTO dto) {
        Material material = new Material();

        material.setDescricao(dto.descricao());
        material.setCategoria(dto.categoria());

        repository.persist(material);

        return MaterialResponseDTO.valueof(material);
    }

    @Override
    @Transactional
    public void update(Long id, MaterialDTO dto) {
        Material material = repository.findById(id);

        material.setDescricao(dto.descricao());
        material.setCategoria(dto.categoria());
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    public List<MaterialResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(e -> MaterialResponseDTO.valueof(e)).toList();
    }

    @Override
    public MaterialResponseDTO findById(Long id) {
        Material fornecedor = repository.findById(id);
        if(fornecedor != null)
            return MaterialResponseDTO.valueof(fornecedor);
        return null;
    }

    @Override
    public MaterialResponseDTO findByDescricao(String descricao) {

        Material material = repository.findByDescricao(descricao);

        if(material != null)
            return MaterialResponseDTO.valueof(material);
        return null;
    }

    @Override
    public MaterialResponseDTO findByCategoria(String categoria) {

        Material material = repository.findByCategoria(categoria);

        if(material != null)
            return MaterialResponseDTO.valueof(material);
        return null;
    }
    
}
