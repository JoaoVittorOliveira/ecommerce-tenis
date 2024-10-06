package br.unitins.joaovittor.basqueteiros.Telefone.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneDTO;
import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneResponseDTO;
import jakarta.validation.Valid;

public interface TelefoneService {

    public TelefoneResponseDTO create(@Valid TelefoneDTO dto);
    public void update(Long id, TelefoneDTO dto);
    public boolean delete(Long id);
    public List<TelefoneResponseDTO> findAll();
    public TelefoneResponseDTO findById(Long id);
    public TelefoneResponseDTO findByDdd(String ddd);
    public TelefoneResponseDTO findByNumero(String numero);
} 