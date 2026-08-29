package school.sptech.api_cinema.model;

public class Filme {

    private Integer idFilme;
    private String titulo;
    private String descricao;
    private String diretor;
    private String url;
    private Integer fkGenero;
    private String genero;

    public Filme(){}

    public Filme(Integer idFilme, String titulo, String descricao, String diretor, String url, Integer fkGenero, String genero) {
        this.idFilme = idFilme;
        this.titulo = titulo;
        this.descricao = descricao;
        this.diretor = diretor;
        this.url = url;
        this.fkGenero = fkGenero;
        this.genero = genero;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDiretor() {
        return diretor;
    }

    public void setDiretor(String diretor) {
        this.diretor = diretor;
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
