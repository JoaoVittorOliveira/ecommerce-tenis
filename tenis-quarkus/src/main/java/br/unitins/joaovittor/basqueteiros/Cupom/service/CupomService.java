package br.unitins.joaovittor.basqueteiros.Cupom.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cupom.dto.CupomDTO;
import br.unitins.joaovittor.basqueteiros.Cupom.dto.CupomResponseDTO;
import jakarta.validation.Valid;

public interface CupomService {
    
    public CupomResponseDTO create(@Valid CupomDTO dto);
    public void update(Long id, CupomDTO dto);
    public boolean delete(Long id);
    public List<CupomResponseDTO> findAll(int page, int pageSize);
    public List<CupomResponseDTO> findAll();
    public CupomResponseDTO findById(Long id);
    public List<CupomResponseDTO> findByCodigo(String nome);
    public List<CupomResponseDTO> findByCodigo(int page, int pageSize,String nome);
    public long count();
}
