package br.unitins.joaovittor.basqueteiros.Cor.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cor.dto.CorDTO;
import br.unitins.joaovittor.basqueteiros.Cor.dto.CorResponseDTO;
import jakarta.validation.Valid;

public interface CorService {
    
    public CorResponseDTO create(@Valid CorDTO dto);
    public void update(Long id, CorDTO dto);
    public boolean delete(Long id);
    public List<CorResponseDTO> findAll(int page, int pageSize);
    public List<CorResponseDTO> findAll();
    public CorResponseDTO findById(Long id);
    public List<CorResponseDTO> findByNome(String nome);
    public List<CorResponseDTO> findByNome(int page, int pageSize, String nome);
    public CorResponseDTO findByCodigoHex(String codigoHex);
    public long count();
}
