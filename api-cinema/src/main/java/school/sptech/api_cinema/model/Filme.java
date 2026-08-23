package school.sptech.api_cinema.model;

public class Filme {

    private Integer idFilme;
    private String titulo;
    private Integer fkGenero;

    public Filme(){}

    public Filme( String titulo, Integer fk_genero) {
        this.titulo = titulo;
        this.fkGenero = fk_genero;
    }

    public Integer getIdFilme() {
        return idFilme;
    }

    public void setIdFilme(Integer idFilme) {
        this.idFilme = idFilme;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getFkGenero() {
        return fkGenero;
    }

    public void setFkGenero(Integer fkGenero) {
        this.fkGenero = fkGenero;
    }
}
