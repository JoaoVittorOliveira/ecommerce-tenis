package br.unitins.joaovittor.basqueteiros.Cliente.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;

public record ClienteUpdateDTO(
    
    // Parte Cliente
    @NotBlank   
    String nome,    
    String cpf,
    LocalDate dataNascimento,

    //Telefone
    String ddd,
    String numero

) {}
