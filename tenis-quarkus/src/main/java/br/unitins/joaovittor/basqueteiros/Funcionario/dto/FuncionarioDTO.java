package br.unitins.joaovittor.basqueteiros.Funcionario.dto;

import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneDTO;
import jakarta.validation.constraints.NotBlank;

public record FuncionarioDTO(

    // Usuario   
    @NotBlank
    String username,

    @NotBlank
    String senha,

    // Funcionario
    @NotBlank
    String nome,
    
    @NotBlank
    String cpf,

    TelefoneDTO telefone,
    int diaNasc,
    int mesNasc,
    int anoNasc,
    String codigoContrato,
    int diaAdmissao,
    int mesAdmissao,
    int anoAdmissao
) {}
