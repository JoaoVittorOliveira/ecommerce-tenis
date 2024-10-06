package br.unitins.joaovittor.basqueteiros.Cupom.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cupom.dto.CupomDTO;
import br.unitins.joaovittor.basqueteiros.Cupom.dto.CupomResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cupom.model.Cupom;
import br.unitins.joaovittor.basqueteiros.Cupom.repository.CupomRepository;
import br.unitins.joaovittor.basqueteiros.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class CupomServiceImp implements CupomService{

    @Inject
    CupomRepository repository;

    @Override
    @Transactional
    public CupomResponseDTO create(@Valid CupomDTO dto) {
        Cupom cupom = new Cupom();

        cupom.setCodigo(dto.codigo());
        cupom.setPorcentagemDesconto(dto.porcentagemDesconto());
        cupom.setValorDesconto(dto.valorDesconto());

        repository.persist(cupom);
        return CupomResponseDTO.valueof(cupom);
    }

    public void verificarCodigo(String codigo){
        Cupom cupom = repository.findByCodigoCompleto(codigo);
        if(cupom != null)
            throw new ValidationException("codigo", "O codigo '"+codigo+"' ja foi utilizado");
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, CupomDTO dto) {
        Cupom cupom = repository.findById(id);
        cupom.setCodigo(dto.codigo());
        cupom.setPorcentagemDesconto(dto.porcentagemDesconto());
        cupom.setValorDesconto(dto.valorDesconto());        
    }

    @Override
    public List<CupomResponseDTO> findAll() {
        return repository.findAll()
                                .stream()
                                .map(e -> CupomResponseDTO.valueof(e)).toList();
    }

    @Override
    public CupomResponseDTO findById(Long id) {
        Cupom cupom = repository.findById(id);
        if(cupom != null)
            return CupomResponseDTO.valueof(cupom);
        return null;
    }

    @Override
    public List<CupomResponseDTO> findByCodigo(String codigo) {
        return repository.findByCodigo(codigo)
                                        .stream()
                                        .map(e -> CupomResponseDTO.valueof(e)).toList();
    }
    
}
