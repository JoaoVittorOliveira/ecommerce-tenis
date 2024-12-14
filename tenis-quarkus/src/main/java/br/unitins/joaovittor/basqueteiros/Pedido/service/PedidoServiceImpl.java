package br.unitins.joaovittor.basqueteiros.Pedido.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.repository.ClienteRepository;
import br.unitins.joaovittor.basqueteiros.ItemPedido.dto.ItemPedidoDTO;
import br.unitins.joaovittor.basqueteiros.ItemPedido.model.ItemPedido;
import br.unitins.joaovittor.basqueteiros.Pedido.dto.PedidoDTO;
import br.unitins.joaovittor.basqueteiros.Pedido.dto.PedidoResponseDTO;
import br.unitins.joaovittor.basqueteiros.Pedido.model.Pedido;
import br.unitins.joaovittor.basqueteiros.Pedido.repository.PedidoRepository;
import br.unitins.joaovittor.basqueteiros.Tenis.model.Tenis;
import br.unitins.joaovittor.basqueteiros.Tenis.repository.TenisRepository;
import br.unitins.joaovittor.basqueteiros.Tenis.service.TenisService;
import br.unitins.joaovittor.basqueteiros.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class PedidoServiceImpl implements PedidoService{

    @Inject
    public PedidoRepository repository;

    @Inject
    public TenisRepository tenisRepository;

    @Inject
    public TenisService tenisService;

    @Inject
    public ClienteRepository clienteRepository;

    @Override
    @Transactional
    public PedidoResponseDTO create(@Valid PedidoDTO dto) {
        
        Pedido pedido = new Pedido();
        pedido.setData(LocalDateTime.now());
        pedido.setCliente(clienteRepository.findById(dto.idCliente()));
        pedido.setValorTotal(0d); // vai atualizar no "for"

        List<ItemPedido> itens = new ArrayList<ItemPedido>();

        for(ItemPedidoDTO itemDTO : dto.itens()){
            
            Tenis tenisItem = tenisRepository.findById(itemDTO.idTenis());

            if(tenisItem.getQuantidade() >= itemDTO.quantidade()){
                ItemPedido itemUnidade = new ItemPedido();

                //itemUnidade.setDesconto(itemDTO.desconto());
                itemUnidade.setQuantidade(itemDTO.quantidade());
                //itemUnidade.setTenis(produtoRepository.findById(itemDTO.idTenis()));

                // calcular valor total sem desconto
                itemUnidade.setValor(tenisItem.getPrecoVenda());

                itens.add(itemUnidade);
                
                // valor total do pedido 
                pedido.setValorTotal( (pedido.getValorTotal() + ( itemUnidade.getValor() * itemUnidade.getQuantidade() ) ) ); 

                // estoque do produto
                tenisService.updateEstoque(itemDTO.idTenis(), itemDTO.quantidade());

            } else{
                // quantidade insuficiente daquele item
                throw new ValidationException("Estoque Insuficiente", 
                                             "estoque insuficiente do produto: "+tenisItem.getNome()
                                             +"\n"
                                             +"Estoque do produto:"+tenisItem.getQuantidade());
            }
            
        }

        pedido.setItens(itens);
        repository.persist(pedido);
        return PedidoResponseDTO.valueOf(pedido);
        
        
        
    }

    @Override
    public PedidoResponseDTO findById(Long id) {
        Pedido pedido = repository.findById(id);
        if (pedido != null)
            return PedidoResponseDTO.valueOf(pedido);
        return null;
    }

    @Override
    public List<PedidoResponseDTO> findAll() {
        return repository
        .listAll()
        .stream()
        .map(e -> PedidoResponseDTO.valueOf(e)).toList();
    }

    @Override
    public List<PedidoResponseDTO> findByCliente(Long idCliente) {
        List<PedidoResponseDTO> lista = repository.findByCliente(idCliente)
                                        .stream()
                                        .map(e -> PedidoResponseDTO.valueOf(e)).toList();
        if(lista != null)
            return lista;
        return null;                                        
    }
    
}
