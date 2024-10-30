package br.unitins.joaovittor.basqueteiros.Cupom.dto;

import java.time.LocalDate;

import io.smallrye.common.constraint.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record CupomDTO (

    @NotBlank(message = "O nome não pode ser nulo ou vazio")
    @Size(min = 5, max = 5, message = "O tamanho do codigo deve conter 5 caracteres.")
    String codigo,

    @PositiveOrZero
    Integer porcentagemDesconto,

    @PositiveOrZero
    Double valorDesconto,

    @FutureOrPresent(message = "Deve-se definir um tempo futuro!")
    @NotNull
    LocalDate dataVencimento
    
){ }
