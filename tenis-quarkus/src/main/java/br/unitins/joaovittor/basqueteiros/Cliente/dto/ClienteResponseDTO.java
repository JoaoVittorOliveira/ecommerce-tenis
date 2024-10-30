package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.model.Cliente;
import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoResponseDTO;
import br.unitins.joaovittor.basqueteiros.Telefone.model.Telefone;

public record ClienteResponseDTO(
    Long id,
    String nome,
    Telefone telefone,
    LocalDate dataNascimento,
    String cpf,
    String username,
    String senha,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao,
    List<EnderecoResponseDTO> listaEndereco
) {
    public static ClienteResponseDTO valueof(Cliente cliente){

        List<EnderecoResponseDTO> lista = cliente.getListaEndereco()
                                        .stream()
                                        .map(EnderecoResponseDTO::valueof)
                                        .toList();


        return new ClienteResponseDTO(cliente.getId(), 
                                cliente.getNome(),
                                cliente.getTelefone(),
                                cliente.getDataNascimento(),
                                cliente.getCpf(),
                                cliente.getUsuario().getUsername(),
                                cliente.getUsuario().getPassword(),
                                cliente.getDataCadastro(), 
                                cliente.getDataAlteracao(),
                                lista);
    }
}
