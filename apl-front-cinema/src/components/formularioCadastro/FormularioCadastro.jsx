import { useEffect, useState } from "react";
import styles from "./FormularioCadastro.module.css";
import axios from "axios";

export function FormularioCadastro(){

    const [generos, setGeneros] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [diretor, setDiretor] = useState("");
    const [url, setUrl] = useState("");
    const [genero, setGenero] = useState("");
    const [nomeGenero, setNomeGenero] = useState("");

    function atualizarEstado( set, valor){
        set(valor);
    }

    function buscarGeneros(){
        axios.get("http://localhost:8080/generos")
        .then(response => {
            setGeneros([{nome: "Selecione um gênero", idGenero: "#"}, ...response.data])
        })
        .catch(error =>{
            console.log("Erro ao buscar genêros:", error);
        })
    }

    function validarCampos(event){
        event.preventDefault();
        console.log(titulo, diretor, descricao, url, genero)

        if(titulo == "" || titulo.length <3 || titulo.length >100){
            console.log("Erro: titulo")
            return
        }
        if(diretor == "" || diretor.length <3 || diretor.length >60){
            console.log("Erro: diretor")
            return
        }
        if(descricao == "" || descricao.length <3 || descricao.length >150){
            console.log("Erro: descricao")
            return
        }
        if(url == "" || url.length <3 || url.length >250){
            console.log("Erro: url")
            return
        }
        if(genero == null || genero == "#"){
            console.log("Erro: genero")
            return
        }

        cadastrar()
        
    }

    function cadastrar(){
        for(let i = 0; i< generos.length; i++){
            if(generos[i].idGenero === genero){
                setNomeGenero(generos[i].nome);
            }
        }
        axios.post("http://localhost:8080/filmes", {
            "titulo": titulo,
            "descricao": descricao,
            "diretor": diretor,
            "url": url,
            "fkGenero": genero,
            "genero": nomeGenero
            
        }).then(response =>{
            limparCampos()
            console.log("Cadastro com sucesso.")
        }).catch(error =>{
            console.log("Erro ao cadastrar.");
        })
    }

    function limparCampos(){
        setTitulo("");
        setDiretor("");
        setDescricao("");
        setUrl("");
        setGenero("#");
    }

    useEffect(() => {
        buscarGeneros();
    }, []);


    



    return(

        <form class={styles.formulario} onSubmit={validarCampos}>
            <div class={styles.label_input}>
                <label htmlFor="titulo">Título:</label>
                <input onChange={(event)=>{ atualizarEstado(setTitulo, event.target.value )}} value={titulo} id="titulo" placeholder="Informe o título" type="text" />
            </div>
            <div class={styles.label_input}>
                <label htmlFor="autor">Diretor:</label>
                <input onChange={(event)=>{ atualizarEstado(setDiretor, event.target.value )}} value={diretor} id="diretor" placeholder="Informe o diretor" type="text" />
            </div>
            <div class={styles.label_input}>
                <label htmlFor="descricao">Descrição:</label>
                <input onChange={(event)=>{ atualizarEstado(setDescricao, event.target.value )}} value={descricao} id="descricao" placeholder="Informe uma descrição" type="text"/>
            </div>
            <div class={styles.label_input}>
                <label htmlFor="url">Capa do filme:</label>
                <input onChange={(event)=>{ atualizarEstado(setUrl, event.target.value )}} value={url} id="url" placeholder="Informe o link para a imagem" type="text" />
            </div>
            <div class={styles.label_input}>
                <label htmlFor="genero">Gênero:</label>
                <select value={genero} onChange={(event)=>{ atualizarEstado(setGenero, event.target.value )}} name="genero" id="genero">
                    {generos.length < 1 ? <option value="#">Nenhum genêro encontrado</option> 
                    : generos.map(genero => <option key={genero.idGenero} value={genero.idGenero}>{genero.nome}</option>)}
                </select>
            </div>
            <button class={styles.botao} type="submit" >Cadastrar filme</button>
        </form>
    );
}