package br.unitins.joaovittor.basqueteiros.Funcionario.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Funcionario.model.Funcionario;
import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneResponseDTO;

public record FuncionarioResponseDTO(
    Long id,
    String nome,
    TelefoneResponseDTO telefone,
    LocalDate dataNascimento,
    String cpf,
    String codigoContrato,
    LocalDate dataAdmissao,
    String username,
    String senha,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
) {
    public static FuncionarioResponseDTO valueof(Funcionario funcionario){

        return new FuncionarioResponseDTO(funcionario.getId(), 
                                          funcionario.getNome(),
                                          TelefoneResponseDTO.valueof(funcionario.getTelefone()),
                                          funcionario.getDataNascimento(),
                                          funcionario.getCpf(),
                                          funcionario.getCodigoContrato(), 
                                          funcionario.getDataAdmissao(),
                                          funcionario.getUsuario().getUsername(),
                                          funcionario.getUsuario().getPassword(),
                                          funcionario.getDataCadastro(), 
                                          funcionario.getDataAlteracao()
                                );
    }
}
