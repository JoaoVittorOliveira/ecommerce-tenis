package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.model.Cliente;
import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoResponseDTO;

public record ClienteAllEnderecosResponseDTO(

    List<EnderecoResponseDTO> listaEndereco
) {
    public static ClienteAllEnderecosResponseDTO valueof(Cliente cliente){

        List<EnderecoResponseDTO> lista = cliente.getListaEndereco()
                                        .stream()
                                        .map(EnderecoResponseDTO::valueof)
                                        .toList();


        return new ClienteAllEnderecosResponseDTO(lista);
    }
}
