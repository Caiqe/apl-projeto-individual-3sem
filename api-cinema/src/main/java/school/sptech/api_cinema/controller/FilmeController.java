package school.sptech.api_cinema.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import school.sptech.api_cinema.model.Filme;

import java.util.List;

@RestController
@RequestMapping("/filmes")
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

    @PostMapping
    public ResponseEntity<Filme> cadastrar(@RequestBody Filme filme){

        String sqlTitulosFilmes = "SELECT titulo FROM filme;";
        List<String> titulosExistentes = template.queryForList(sqlTitulosFilmes, String.class);


        if(filme.getTitulo().isBlank()
                || filme.getTitulo().length()<3
                || titulosExistentes.contains(filme.getTitulo())){
            return ResponseEntity.status(400).build();
        }

        String sqlIdsGeneros = "SELECT id_genero FROM genero;";
        List<Integer> generosValidos = template.queryForList(sqlIdsGeneros, Integer.class);

        if(!generosValidos.contains(filme.getFkGenero())){
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO filme VALUES (default, ?, ?);";
        template.update(sql, filme.getTitulo(), filme.getFkGenero());

        return ResponseEntity.status(201).body(filme);
    }
}
