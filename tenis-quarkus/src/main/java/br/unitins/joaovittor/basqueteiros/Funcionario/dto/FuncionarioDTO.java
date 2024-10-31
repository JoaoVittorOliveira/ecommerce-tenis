package br.unitins.joaovittor.basqueteiros.Funcionario.dto;

import java.time.LocalDate;
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

    String ddd,
    String numero,

    LocalDate dataNascimento,
    String codigoAdmissao,
    LocalDate dataAdmissao
) {}
