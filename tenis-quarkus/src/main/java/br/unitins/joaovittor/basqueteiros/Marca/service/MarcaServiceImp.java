package br.unitins.joaovittor.basqueteiros.Marca.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Marca.dto.MarcaDTO;
import br.unitins.joaovittor.basqueteiros.Marca.dto.MarcaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Marca.model.Marca;
import br.unitins.joaovittor.basqueteiros.Marca.repository.MarcaRepository;
import br.unitins.joaovittor.basqueteiros.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class MarcaServiceImp implements MarcaService{

    @Inject
    MarcaRepository repository;

    @Override
    @Transactional
    public MarcaResponseDTO create(@Valid MarcaDTO dto) {
        Marca marca = new Marca();
        marca.setNome(dto.nome());

        repository.persist(marca);
        return MarcaResponseDTO.valueof(marca);
    }

    public void verificarNome(String nome){
        Marca marca = repository.findByNomeCompleto(nome);
        if(marca != null)
            throw new ValidationException("nome", "O nome '"+nome+"' ja foi utilizado");
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, MarcaDTO dto) {
        Marca marca = repository.findById(id);
        marca.setNome(dto.nome());
        
    }

    @Override
    public List<MarcaResponseDTO> findAll() {
        return repository.findAll()
                                .stream()
                                .map(e -> MarcaResponseDTO.valueof(e)).toList();
    }

    @Override
    public MarcaResponseDTO findById(Long id) {
        Marca marca = repository.findById(id);
        if(marca != null)
            return MarcaResponseDTO.valueof(marca);
        return null;
    }

    @Override
    public List<MarcaResponseDTO> findByNome(String nome) {
        return repository.findByNome(nome)
                                        .stream()
                                        .map(e -> MarcaResponseDTO.valueof(e)).toList();
    }
    
}
