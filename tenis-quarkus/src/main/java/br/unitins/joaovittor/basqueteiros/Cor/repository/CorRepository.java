package br.unitins.joaovittor.basqueteiros.Cor.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cor.model.Cor;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CorRepository implements PanacheRepository<Cor> {
    
    public PanacheQuery<Cor> findByNome(String nome){
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%");  
    }

    public Cor findByNomeCompleto(String nome){
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%").firstResult();  
    }

    public Cor findByCodigoHex(String codigoHex){
        return find("UPPER(codigo_hex) = ?1", "%"+ codigoHex.toUpperCase() + "%").firstResult(); 
    }
}
