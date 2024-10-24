package br.unitins.joaovittor.basqueteiros.Cor.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cor.dto.CorDTO;
import br.unitins.joaovittor.basqueteiros.Cor.dto.CorResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cor.model.Cor;
import br.unitins.joaovittor.basqueteiros.Cor.repository.CorRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class CorServiceImp implements CorService {
    
    @Inject
    CorRepository repository;

    @Override
    @Transactional
    public CorResponseDTO create(@Valid CorDTO dto) {
        Cor Cor = new Cor();

        Cor.setNome(dto.nome());
        Cor.setCodigoHex(dto.codigoHex());

        repository.persist(Cor);
        return CorResponseDTO.valueof(Cor);
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, CorDTO dto) {
        Cor Cor = repository.findById(id);
        Cor.setNome(dto.nome());
        Cor.setCodigoHex(dto.codigoHex());
        
    }

    @Override
    public List<CorResponseDTO> findAll(int page, int pageSize)  {
        List<Cor> listCor = repository.findAll()
                            .page(page,pageSize)
                            .list();
        return listCor.stream().map(e->CorResponseDTO.valueof(e)).toList();
    }

    @Override
    public CorResponseDTO findById(Long id) {

        Cor cor = repository.findById(id);

        if(cor != null)
            return CorResponseDTO.valueof(repository.findById(id));
        return null;       
    }
    

    @Override
    public List<CorResponseDTO> findByNome(String nome) {
        List<Cor> listCor = repository
                                    .findByNome(nome)
                                    .list();
        return listCor
                    .stream()
                    .map(e -> CorResponseDTO.valueof(e))
                    .toList();
    }
    @Override
    public List<CorResponseDTO> findByNome(int page, int pageSize, String nome) {
        List<Cor> listCor = repository
                                    .findByNome(nome)
                                    .page(page, pageSize)
                                    .list();
        return listCor
                    .stream()
                    .map(e -> CorResponseDTO.valueof(e))
                    .toList(); 
    }

    @Override
    public CorResponseDTO findByCodigoHex(String codigoHex) {

        Cor cor = repository.findByCodigoHex(codigoHex);
        if(cor != null)
            return CorResponseDTO.valueof(cor);
        return null;

    }

    @Override
    public long count() {
        return repository.count();
    }

    
}
