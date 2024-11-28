package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoDTO;
import jakarta.validation.constraints.NotBlank;

public record ClienteAddEnderecoDTO(
    
@NotBlank
    EnderecoDTO novoEndereco

) {}
