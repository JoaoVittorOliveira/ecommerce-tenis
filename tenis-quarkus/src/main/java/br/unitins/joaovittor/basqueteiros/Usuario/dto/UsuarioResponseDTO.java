package br.unitins.joaovittor.basqueteiros.Usuario.dto;

import java.time.LocalDateTime;

public record UsuarioResponseDTO (
    Long id,
    String username,
    String nome,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
){
    // AJUSTAR!! (importante para fazer login)
    /*
    public static UsuarioResponseDTO valueof(PessoaFisica pf){
        return new UsuarioResponseDTO(
            pf.getId(),
            pf.getUsuario().getUsername(),
            pf.getNome(),
            pf.getDataCadastro(),
            pf.getDataAlteracao()
        );
    }
    */
}
