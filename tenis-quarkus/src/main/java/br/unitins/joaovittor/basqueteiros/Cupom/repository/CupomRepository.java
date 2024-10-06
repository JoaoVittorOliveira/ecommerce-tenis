package br.unitins.joaovittor.basqueteiros.Cupom.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cupom.model.Cupom;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CupomRepository implements PanacheRepository<Cupom>{
    
    public List<Cupom> findByCodigo(String codigo){
        return find("UPPER(codigo) LIKE ?1", "%"+ codigo.toUpperCase() + "%").list();  
    }

    public Cupom findByCodigoCompleto(String codigo){
        return find("UPPER(codigo) LIKE ?1", "%"+ codigo.toUpperCase() + "%").firstResult();  
    }
    
}
