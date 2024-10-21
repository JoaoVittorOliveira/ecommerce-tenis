package br.unitins.joaovittor.basqueteiros.ItemPedido.model;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import br.unitins.joaovittor.basqueteiros.Tenis.model.Tenis;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemPedido extends DefaultEntity{

    private Double valor;
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Tenis tenis;

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Tenis getTenis() {
        return tenis;
    }

    public void setTenis(Tenis tenis) {
        this.tenis = tenis;
    }
    
}
