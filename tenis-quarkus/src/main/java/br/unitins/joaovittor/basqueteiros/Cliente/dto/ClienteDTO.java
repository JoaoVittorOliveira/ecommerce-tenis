package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneDTO;
import jakarta.validation.constraints.NotBlank;

public record ClienteDTO(
    
// Parte Cliente
    @NotBlank   
    String nome,    
    
    List<EnderecoDTO> listaEndereco,
    String cpf,
    TelefoneDTO telefone,
    int diaNasc,
    int mesNasc,
    int anoNasc,

    // Usuario
    @NotBlank
    String username,
    
    @NotBlank
    String senha
) {}
