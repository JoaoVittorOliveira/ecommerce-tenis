package br.unitins.joaovittor.basqueteiros.Tenis.service;

import java.util.List;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisResponseDTO;
import jakarta.validation.Valid;

public interface TenisService {

    public TenisResponseDTO create(@Valid TenisDTO dto);
    public boolean delete(Long id);
    public void update(Long id, TenisDTO dto);
    public TenisResponseDTO findById(Long id);
    public List<TenisResponseDTO> findAll(int page, int pageSize);
    public List<TenisResponseDTO> findAll();
    public TenisResponseDTO salveImage(Long id, String nomeImagem);
    public void updateEstoque(Long id, int qtdComprada);

}
