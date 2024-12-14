package br.unitins.joaovittor.basqueteiros.Comentarios.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Comentarios.model.Comentario;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ComentarioRepository implements PanacheRepository<Comentario>{
    public List<Comentario> findByIdTenisOrderByDataDesc(Long idTenis) {
        return find("idTenis = ?1 ORDER BY data DESC", idTenis).list();
    }
  
}
