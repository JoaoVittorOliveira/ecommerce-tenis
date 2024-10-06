package br.unitins.joaovittor.basqueteiros.Cupom.model;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Cupom extends DefaultEntity{
    
    @Column(name = "codigo")
    private String codigo;

    @Column(name = "porcentagem_desconto")
    private Integer porcentagemDesconto;

    @Column(name = "valor_desconto")
    private Double valorDesconto;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getPorcentagemDesconto() {
        return porcentagemDesconto;
    }

    public void setPorcentagemDesconto(Integer porcentagemDesconto) {
        this.porcentagemDesconto = porcentagemDesconto;
    }

    public Double getValorDesconto() {
        return valorDesconto;
    }

    public void setValorDesconto(Double valorDesconto) {
        this.valorDesconto = valorDesconto;
    }
   
}
