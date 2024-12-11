package br.unitins.joaovittor.basqueteiros.Usuario.dto;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.Usuario.model.Usuario;

public record UsuarioResponseDTO (
    Long id,
    String username,
    String senha,
    String perfil,
    LocalDateTime dataCadastro,
    LocalDateTime dataAlteracao
){
    
    public static UsuarioResponseDTO valueof(Usuario usuario){
        return new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getUsername(),
            usuario.getPassword(),
            usuario.getPerfil(),
            usuario.getDataCadastro(),
            usuario.getDataAlteracao()
        );
    }
    
}
