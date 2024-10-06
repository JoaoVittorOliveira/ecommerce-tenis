package br.unitins.joaovittor.basqueteiros.Avaliacao.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Avaliacao.model.Avaliacao;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AvaliacaoRepository implements PanacheRepository<Avaliacao>{
    
    public List<Avaliacao> findByComentario(String comentario){
        return find("UPPER(comentario) LIKE ?1", "%"+ comentario.toUpperCase() + "%").list();  
    }

    public Avaliacao findByComentarioCompleto(String comentario){
        return find("UPPER(comentario) LIKE ?1", "%"+ comentario.toUpperCase() + "%").firstResult();  
    }
    
}
