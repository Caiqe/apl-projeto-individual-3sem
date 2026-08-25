package school.sptech.api_cinema.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import school.sptech.api_cinema.model.Filme;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/filmes")
@CrossOrigin
public class FilmeController {

    private final JdbcTemplate template;

    public FilmeController(JdbcTemplate template){
        this.template = template;
    }

    @GetMapping()
    public ResponseEntity<List<Filme>> listarFilmes(){
        String sql = "SELECT * FROM filme;";
        List<Filme> filmes = template.query(sql, new BeanPropertyRowMapper<>(Filme.class));

        return ResponseEntity.status(200).body(filmes);
    }

    @GetMapping("/{titulo}")
    public ResponseEntity<List<Filme>> buscaPorTitulo(@PathVariable String titulo){
        String sql = "SELECT * FROM filme WHERE LOWER(titulo) LIKE ?";
        List<Filme> filmes = template.query(sql, new BeanPropertyRowMapper<>(Filme.class), "%"+titulo.toLowerCase()+"%");

        if(filmes.size()<1){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(filmes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPorId(@PathVariable int id){
        if(!existeFilmePorId(id)){
            return ResponseEntity.status(404).build();
        }
        String sql = "DELETE FROM filme WHERE id_filme LIKE ?";

        template.update(sql, id);

        return ResponseEntity.status(204).build();

    }
    @PostMapping
    public ResponseEntity<Filme> cadastrar(@RequestBody Filme filme){

        String sqlTitulosFilmes = "SELECT titulo FROM filme;";
        List<String> titulosExistentes = template.queryForList(sqlTitulosFilmes, String.class);


        if(filme.getTitulo().isBlank()
                || filme.getTitulo().length()<3
                || titulosExistentes.contains(filme.getTitulo())){
            return ResponseEntity.status(400).build();
        }

        if(filme.getDescricao().isBlank()
            || filme.getDescricao().length() < 3
            || filme.getDescricao().length() >150){
            return ResponseEntity.status(400).build();
        }

        if(filme.getDiretor().isBlank()
            || filme.getDiretor().length() <3
            || filme.getDiretor().length() >60){
            return ResponseEntity.status(400).build();
        }

        if(filme.getUrl().isBlank()
            || filme.getUrl().length()<3
            || filme.getUrl().length()>250){
            return ResponseEntity.status(400).build();
        }

        String sqlIdsGeneros = "SELECT id_genero FROM genero;";
        List<Integer> generosValidos = template.queryForList(sqlIdsGeneros, Integer.class);

        if(!generosValidos.contains(filme.getFkGenero())){
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO filme VALUES (default, ?, ?, ?, ?, ?);";
        KeyHolder holder = new GeneratedKeyHolder();

        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, filme.getTitulo());
            statement.setString(2, filme.getDescricao());
            statement.setString(3, filme.getDiretor());
            statement.setString(4, filme.getUrl());
            statement.setInt(5, filme.getFkGenero());

            return statement;
        }, holder);

        int idGerado = holder.getKey().intValue();
        filme.setIdFilme(idGerado);

        return ResponseEntity.status(201).body(filme);
    }

    private boolean existeFilmePorId(int id){

        String sql = "SELECT COUNT(*) FROM filme WHERE id_filme = ?;";
        Integer quantidadeFilmes = template.queryForObject(sql, Integer.class, id);

        if(quantidadeFilmes == null || quantidadeFilmes<1){
            return false;
        }
        return true;
    }
}
