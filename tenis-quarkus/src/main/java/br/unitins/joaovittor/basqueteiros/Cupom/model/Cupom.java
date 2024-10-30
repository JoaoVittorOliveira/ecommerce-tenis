package br.unitins.joaovittor.basqueteiros.Cupom.model;

import java.time.LocalDate;

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

    @Column(name = "data_vencimento")
    private LocalDate dataVencimento;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
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
