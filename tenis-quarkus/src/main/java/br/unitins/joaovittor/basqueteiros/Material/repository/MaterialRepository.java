package br.unitins.joaovittor.basqueteiros.Material.repository;

import br.unitins.joaovittor.basqueteiros.Material.model.Material;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MaterialRepository implements PanacheRepository<Material>{
    
    public PanacheQuery<Material> findByDescricao(String descricao){
        return find("UPPER(descricao) LIKE ?1", "%"+ descricao.toUpperCase() + "%");
    }
    public Material findByCategoria(String categoria){
        return find("categoria = ?1", categoria).firstResult();  
    }

}
