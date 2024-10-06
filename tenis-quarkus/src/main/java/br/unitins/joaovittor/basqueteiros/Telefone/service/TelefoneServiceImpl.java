package br.unitins.joaovittor.basqueteiros.Telefone.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneResponseDTO;
import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneDTO;
import br.unitins.joaovittor.basqueteiros.Telefone.model.Telefone;
import br.unitins.joaovittor.basqueteiros.Telefone.repository.TelefoneRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class TelefoneServiceImpl implements TelefoneService{

    @Inject
    TelefoneRepository repository;

    @Override
    @Transactional
    public TelefoneResponseDTO create(@Valid TelefoneDTO dto) {
        Telefone telefone = new Telefone();

        telefone.setDdd(dto.ddd());
        telefone.setNumero(dto.numero());

        repository.persist(telefone);

        return TelefoneResponseDTO.valueof(telefone);
    }

    @Override
    @Transactional
    public void update(Long id, TelefoneDTO dto) {
        Telefone telefone = repository.findById(id);

        telefone.setDdd(dto.ddd());
        telefone.setNumero(dto.numero());
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    public List<TelefoneResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(e -> TelefoneResponseDTO.valueof(e)).toList();
    }

    @Override
    public TelefoneResponseDTO findById(Long id) {
        Telefone fornecedor = repository.findById(id);
        if(fornecedor != null)
            return TelefoneResponseDTO.valueof(fornecedor);
        return null;
    }

    @Override
    public TelefoneResponseDTO findByDdd(String ddd) {

        Telefone telefone = repository.findByDdd(ddd);

        if(telefone != null)
            return TelefoneResponseDTO.valueof(telefone);
        return null;
    }

    @Override
    public TelefoneResponseDTO findByNumero(String numero) {

        Telefone telefone = repository.findByNumero(numero);

        if(telefone != null)
            return TelefoneResponseDTO.valueof(telefone);
        return null;
    }
    
}
