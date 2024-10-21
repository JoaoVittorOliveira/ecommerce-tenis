package br.unitins.joaovittor.basqueteiros.Categoria.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Categoria.model.Categoria;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CategoriaRepository implements PanacheRepository<Categoria> {
    
    public List<Categoria> findByNome(String nome){
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%").list();  
    }

    public Categoria findByNomeCompleto(String nome){
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%").firstResult();  
    }

    public List<Categoria> findByDescricao(String descricao){
        return find("UPPER(descricao) = ?1", "%"+ descricao.toUpperCase() + "%").firstResult(); 
    }

    public List<Categoria> findByFaixaEtaria(String faixaEtaria){
        return find("UPPER(faixa_etaria) = ?1", "%"+ faixaEtaria.toUpperCase() + "%").firstResult();
    }

    public List<Categoria> findByGenero(String genero){
        return find("UPPER(genero) = ?1", "%"+ genero.toUpperCase() + "%").firstResult();
    }
}
