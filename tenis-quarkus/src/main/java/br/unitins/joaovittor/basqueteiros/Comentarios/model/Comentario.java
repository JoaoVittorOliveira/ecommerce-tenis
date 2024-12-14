package br.unitins.joaovittor.basqueteiros.Comentarios.model;

import java.time.LocalDateTime;

import br.unitins.joaovittor.basqueteiros.DefaultEntity.model.DefaultEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Comentario extends DefaultEntity {
    
    @Column(name = "id_tenis", nullable = false)
    private Long idTenis;

    @Column(nullable = false)
    private String usuario;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(nullable = false, updatable = false)
    private LocalDateTime data = LocalDateTime.now();

    // Getters e Setters
    public Long getIdTenis() { return idTenis; }
    public void setIdTenis(Long idTenis) { this.idTenis = idTenis; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }
}
