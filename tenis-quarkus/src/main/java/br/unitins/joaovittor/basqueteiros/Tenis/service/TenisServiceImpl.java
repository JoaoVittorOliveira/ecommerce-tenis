package br.unitins.joaovittor.basqueteiros.Tenis.service;

import java.util.List;
import java.util.stream.Collectors;

import br.unitins.joaovittor.basqueteiros.Categoria.repository.CategoriaRepository;
import br.unitins.joaovittor.basqueteiros.Cor.repository.CorRepository;
import br.unitins.joaovittor.basqueteiros.Marca.repository.MarcaRepository;
import br.unitins.joaovittor.basqueteiros.Material.repository.MaterialRepository;
import br.unitins.joaovittor.basqueteiros.Tamanho.repository.TamanhoRepository;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.dto.TenisResponseDTO;
import br.unitins.joaovittor.basqueteiros.Tenis.model.Tenis;
import br.unitins.joaovittor.basqueteiros.Tenis.repository.TenisRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class TenisServiceImpl implements TenisService{

    @Inject
    public TenisRepository repository;

    @Inject
    public MarcaRepository marcaRepository;

    @Inject
    public MaterialRepository materialRepository;

    @Inject
    public CorRepository corRepository;

    @Inject
    public CategoriaRepository categoriaRepository;

    @Inject
    public TamanhoRepository tamanhoRepository;

    @Override
    @Transactional
    public TenisResponseDTO create(@Valid TenisDTO dto) {
        
        Tenis tenis = new Tenis();
        tenis.setNome(dto.nome());
        tenis.setQuantidade(dto.quantidade());
        tenis.setPeso(dto.peso());
        tenis.setPrecoCompra(dto.precoCompra());
        tenis.setPrecoVenda(dto.precoVenda());
        tenis.setMarca(marcaRepository.findById(dto.idMarca()));
        tenis.setMaterial(materialRepository.findById(dto.idMaterial()));
        tenis.setCor(corRepository.findById(dto.idCor()));
        tenis.setCategoria(categoriaRepository.findById(dto.idCategoria()));
        tenis.setTamanho(tamanhoRepository.findById(dto.idTamanho()));

        repository.persist(tenis);
        return TenisResponseDTO.valueOf(tenis);
    }

    @Override
    @Transactional
    public void update(Long id, TenisDTO dto) {

        Tenis tenis = repository.findById(id);
        tenis.setNome(dto.nome());
        tenis.setQuantidade(dto.quantidade());
        tenis.setPeso(dto.peso());
        tenis.setPrecoCompra(dto.precoCompra());
        tenis.setPrecoVenda(dto.precoVenda());
        tenis.setMarca(marcaRepository.findById(dto.idMarca()));
        tenis.setMaterial(materialRepository.findById(dto.idMaterial()));
        tenis.setCor(corRepository.findById(dto.idCor()));
        tenis.setCategoria(categoriaRepository.findById(dto.idCategoria()));
        tenis.setTamanho(tamanhoRepository.findById(dto.idTamanho()));
    }

    @Override
    public TenisResponseDTO findById(Long id) {
        Tenis tenis = repository.findById(id);
        if (tenis != null)
            return TenisResponseDTO.valueOf(tenis);
        return null;
    }

    @Override
    public List<TenisResponseDTO> findAll(int page, int pageSize) {
        List<Tenis> list = repository
        .findAll()
        .page(page,pageSize)
        .list();
        return list.stream()
         .map(e -> TenisResponseDTO.valueOf(e)).collect(Collectors.toList());
    }

    @Override
    public List<TenisResponseDTO> findAll() {
        return repository
        .listAll()
        .stream()
        .map(e -> TenisResponseDTO.valueOf(e)).toList();
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public TenisResponseDTO salveImage(Long id, String nomeImagem) {

        Tenis entity = repository.findById(id);
        entity.setNomeImagem(nomeImagem);

        return TenisResponseDTO.valueOf(entity);
    }

    
}
