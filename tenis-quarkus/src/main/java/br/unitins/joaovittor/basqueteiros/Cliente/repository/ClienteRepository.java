package br.unitins.joaovittor.basqueteiros.Cliente.repository;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.model.Cliente;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ClienteRepository implements PanacheRepository<Cliente> {
    
    public List<Cliente> findByNome(String nome){
        return find("UPPER(nome) LIKE ?1", "%"+ nome.toUpperCase() + "%").list();  
    }

    public Cliente findByCpf(String cpf){
        return find("cpf = ?1", cpf).firstResult();
    }

    public Cliente findByUsername(String username){
        return find("usuario.username = ?1", username).firstResult();
    }

    public Cliente findByUsernameAndSenha(String username, String senha){
        return find("usuario.username = ?1 AND usuario.password = ?2", username, senha).firstResult();
    }

    public Cliente findByIdUsuario(Long idUsuario){
        return find("usuario.id = ?1", idUsuario).firstResult();
    }
    
}
