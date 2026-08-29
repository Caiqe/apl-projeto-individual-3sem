import axios from "axios";
import { useState, useEffect } from "react";
import { CardFilme } from "../../components/cardFilme/CardFilme";
import styles from "./ListaFilmes.module.css"

export function ListaFilmes(){
    
    const [filmes, setFilmes] = useState([{}]);

    
    function buscarFilmes(){
        axios.get("http://localhost:8080/filmes")
        .then(response =>{
            setFilmes(response.data);
        }).catch(error => {console.log("Erro para buscar filmes:",error)})
    }

    function buscarFilmesPorTitulo( titulo ){
        if(titulo.length == 0){
            buscarFilmes();
            return
        }
        if(titulo.length<3){
            return
        }

        axios.get("http://localhost:8080/filmes/buscar/"+ titulo)
        .then(response =>{
            setFilmes(response.data);
        }).catch(error => {
            if(error.response && error.response.status === 404){
                setFilmes([]);
            }else{
                console.log("Erro ao buscar filmes por titulo:", error);
            }
        })
    }

    useEffect(() => {
        buscarFilmes();
    }, []);

    return (

        <main class={styles.corpo}>
            <h2>Filmes encontrados ({filmes.length}): </h2>
            <div class={styles.secao_pesquisa}>
                <label class={styles.label_pesquisa} htmlFor="barra_pesquisa">Buscar Títulos:</label>
                <input id="barra_pesquisa" placeholder="Qual filme procura?" class={styles.barra_pesquisa} onChange={(event)=> {buscarFilmesPorTitulo(event.target.value)}} type="text"  />
            </div>
            <div class={styles.lista}>
                { filmes.length > 0 ? 
                filmes.map(filme => <CardFilme titulo={filme.titulo} descricao={filme.descricao} autor={filme.diretor} genero={filme.genero} imagem={filme.url}></CardFilme>) 
                : <h4>Nenhum filme encontrado...</h4>}
            </div>
        </main>
    );
}