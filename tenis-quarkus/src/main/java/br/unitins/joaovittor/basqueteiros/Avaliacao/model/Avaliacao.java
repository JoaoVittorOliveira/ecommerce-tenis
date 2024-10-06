package br.unitins.joaovittor.basqueteiros.Avaliacao.model;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Avaliacao extends DefaultEntity{
    
    @Column(name = "comentario")
    private String comentario;

    // private Produto ??

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

        
}
