package school.sptech.api_cinema.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import school.sptech.api_cinema.model.Genero;

import java.util.List;

@RestController
@RequestMapping("/generos")
@CrossOrigin
public class GeneroController {

    private JdbcTemplate template;

    public GeneroController (JdbcTemplate template){
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<List<Genero>> listar(){
        String sql = "SELECT * FROM genero;";

        List<Genero> generos = template.query(sql, new BeanPropertyRowMapper<>(Genero.class));

        return ResponseEntity.status(200).body(generos);
    }
}
