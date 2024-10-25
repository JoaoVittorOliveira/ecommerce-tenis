package br.unitins.joaovittor.basqueteiros.Tamanho.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Categoria.dto.CategoriaResponseDTO;
import br.unitins.joaovittor.basqueteiros.Tamanho.dto.TamanhoDTO;
import br.unitins.joaovittor.basqueteiros.Tamanho.dto.TamanhoResponseDTO;
import jakarta.validation.Valid;

public interface TamanhoService {
    
    public TamanhoResponseDTO create(@Valid TamanhoDTO dto);
    public void update(Long id, TamanhoDTO dto);
    public boolean delete(Long id);
    public long count();
    public List<TamanhoResponseDTO> findAll(int page, int pageSize);
    public List<TamanhoResponseDTO> findByNome(String nome);
    public List<TamanhoResponseDTO> findByNome(int page, int pageSize, String nome);
    public TamanhoResponseDTO findById(Long id);
    public List<TamanhoResponseDTO> findByNumeracao(Integer numeracao);
}
