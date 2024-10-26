package br.unitins.joaovittor.basqueteiros.Tamanho.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Tamanho.model.Tamanho;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TamanhoRepository implements PanacheRepository<Tamanho>{
    
    public PanacheQuery<Tamanho> findByNome(String nome) {
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%");
    }

    public PanacheQuery<Tamanho> findByNumeracao(Integer numeracao){
        return find("numeracao = ?1", numeracao);  
    }

    public Tamanho findByNumeracaoFirstResult(Integer numeracao){
        return find("numeracao = ?1", numeracao).firstResult();
    }

    public List<Tamanho> findByTamanhoEmCm(String tamanhoEmCm){
        return find("tamanhoEmCm LIKE ?1", "%"+ tamanhoEmCm + "%").list();  
    }
}
