package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import java.time.LocalDate;
import java.util.List;

import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoDTO;
import jakarta.validation.constraints.NotBlank;

public record ClienteDTO(
    
    // Parte Cliente
    @NotBlank   
    String nome,    
    List<EnderecoDTO> listaEndereco,
    String cpf,
    LocalDate dataNascimento,

    //Telefone
    String ddd,
    String numero,

    // Usuario
    @NotBlank
    String username,
    
    @NotBlank
    String senha
) {}
