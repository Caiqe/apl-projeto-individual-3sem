import axios from "axios";
import { useState, useEffect } from "react";
import { CardFilme } from "../../components/cardFilme/CardFilme";
import styles from "./ListaFilmes.module.css"
import { Link } from "react-router-dom";
import { Modal } from "../../components/modal/Modal";

export function ListaFilmes(){
    
    const[filmes, setFilmes] = useState([{}]);
    const[filmeSelecionado, setFilmeSelecionado] = useState();

    const[exibirModal, setExibirModal] = useState(false);

    
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

    function abrirModal(id){
        setFilmeSelecionado(id);
        setExibirModal(true);
    }

    function fecharModal(){
        setExibirModal(false);
        setFilmeSelecionado(null)
    }

    function deletar( id ){

        axios.delete("http://localhost:8080/filmes/"+id)
        .then(response => {
            console.log("Deletado com sucesso.")
            fecharModal()
            buscarFilmes();
        }).catch(error =>{
            console.log("Erro ao deletar")
            fecharModal()
        })

    }

    useEffect(() => {
        buscarFilmes();
    }, []);

    return (

        <main className={styles.corpo}>
            <Link className={styles.link} to="/cadastro">{ "< Cadastrar"}</Link>
            <h2>Filmes encontrados ({filmes.length}): </h2>
            <div className={styles.secao_pesquisa}>
                <label className={styles.label_pesquisa} htmlFor="barra_pesquisa">Buscar Títulos:</label>
                <input id="barra_pesquisa" placeholder="Qual filme procura?" className={styles.barra_pesquisa} onChange={(event)=> {buscarFilmesPorTitulo(event.target.value)}} type="text"  />
            </div>
            <div className={styles.lista}>
                { filmes.length > 0 ? 
                filmes.map(filme => <CardFilme id={filme.idFilme} funcDeletar={abrirModal} titulo={filme.titulo} descricao={filme.descricao} autor={filme.diretor} genero={filme.genero} imagem={filme.url}></CardFilme>) 
                : <h4>Nenhum filme encontrado...</h4>}
            </div>
            {!exibirModal ? "" : 
                <Modal 
                    titulo={"Deletar Filme:"} 
                    mensagem={"Tem certeza que deseja deletar esse filme?"}
                    acaoTexto={"Deletar"}
                    fechar={fecharModal}
                    acao={deletar}
                    params={filmeSelecionado}
                    tituloFilme={filmes.filter(filme => filme.idFilme == filmeSelecionado ).map(filme=> filme.titulo)}
                ></Modal>
            }
        </main>
    );
}