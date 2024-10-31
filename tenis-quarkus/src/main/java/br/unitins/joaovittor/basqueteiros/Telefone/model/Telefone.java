package br.unitins.joaovittor.basqueteiros.Telefone.model;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Telefone extends DefaultEntity{

    @Column(name = "ddd", length = 3, nullable = false)
    private String ddd;

    @Column(name = "numero", length = 15, nullable = false)
    private String numero;

    
    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    
}
