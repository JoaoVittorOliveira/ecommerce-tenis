package br.unitins.joaovittor.basqueteiros.PessoaFisica.model;

import br.unitins.joaovittor.basqueteiros.Pessoa.model.Pessoa;
import br.unitins.joaovittor.basqueteiros.Usuario.model.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class PessoaFisica extends Pessoa{
    
    

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
