package br.unitins.joaovittor.basqueteiros.Material.model;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Material extends DefaultEntity{

    @Column(name = "descricao")
    private String descricao; //nome: ex: couro, tecido, jeans

    @Column(name = "categoria")
    private String categoria; //natural, sintético, borracha

    
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
