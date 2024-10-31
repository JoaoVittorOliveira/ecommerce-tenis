package br.unitins.joaovittor.basqueteiros.Funcionario.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Funcionario.model.Funcionario;
import br.unitins.joaovittor.basqueteiros.Telefone.dto.TelefoneResponseDTO;
import br.unitins.joaovittor.basqueteiros.Usuario.dto.UsuarioResponseDTO;

public record FuncionarioResponseDTO(
    Long id,
    String nome,
    TelefoneResponseDTO telefone,
    LocalDate dataNascimento,
    String cpf,
    String codigoAdmissao,
    LocalDate dataAdmissao,
    //UsuarioResponseDTO usuario,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
) {
    public static FuncionarioResponseDTO valueof(Funcionario funcionario){

        return new FuncionarioResponseDTO(funcionario.getId(), 
                                          funcionario.getNome(),
                                          TelefoneResponseDTO.valueof(funcionario.getTelefone()),
                                          funcionario.getDataNascimento(),
                                          funcionario.getCpf(),
                                          funcionario.getCodigoAdmissao(), 
                                          funcionario.getDataAdmissao(),
                                          //UsuarioResponseDTO.funcionario.getUsuario(),
                                          funcionario.getDataCadastro(), 
                                          funcionario.getDataAlteracao()
                                );
    }
}
