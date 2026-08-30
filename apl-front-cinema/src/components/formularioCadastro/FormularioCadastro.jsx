import { useEffect, useState } from "react";
import styles from "./FormularioCadastro.module.css";
import axios from "axios";

export function FormularioCadastro(){

    const [generos, setGeneros] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [diretor, setDiretor] = useState("");
    const [url, setUrl] = useState("");
    const [genero, setGenero] = useState("#");

    const[ehTituloValido, setTituloValido] = useState(true);
    const[ehDescricaoValido, setDescricaoValido] = useState(true);
    const[ehDiretorValido, setDiretorValido] = useState(true);
    const[ehUrlValido, setUrlValido] = useState(true);
    const[ehGeneroValido, setGeneroValido] = useState(true);
    

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

        const ehTituloOk = validarString(titulo, setTituloValido, 3, 100);
        const ehDiretorOk = validarString(diretor, setDiretorValido, 3, 60);
        const ehDescricaoOk = validarString(descricao, setDescricaoValido, 3, 150);
        const ehUrlOk = validarString(url, setUrlValido, 3, 250);
        let ehGeneroOk = true;
        
        if(genero == null || genero == "#"){
            console.log("Erro: genero")
            ehGeneroOk = false;
            setGeneroValido(false);
            return
        }
        if(ehTituloOk && ehDiretorOk && ehDescricaoOk && ehUrlOk && ehGeneroOk){
            cadastrar() 
        }
    
    }

    function validarString(string, func ,minimo, maximo){
        if(string == "" || string.length <Number(minimo) || string.length >Number(maximo)){
            
            func(false);
            return false;
        }
        func(true);
        return true;
    }

    function cadastrar(){
        axios.post("http://localhost:8080/filmes", {
            "titulo": titulo,
            "descricao": descricao,
            "diretor": diretor,
            "url": url,
            "fkGenero": genero
            
        }).then(response =>{
            limparCampos()
            console.log("Cadastro com sucesso.")
        }).catch(error =>{
            console.log("Erro ao cadastrar.", error);
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
                {ehTituloValido ? "": <p class={styles.error_message}>O título deve conter entre 3 e 100 caracteres.</p>}
            </div>
            <div class={styles.label_input}>
                <label htmlFor="autor">Diretor:</label>
                <input onChange={(event)=>{ atualizarEstado(setDiretor, event.target.value )}} value={diretor} id="diretor" placeholder="Informe o diretor" type="text" />
                {ehDiretorValido ? "": <p class={styles.error_message}>O diretor deve conter entre 3 e 60 caracteres.</p>}
            </div>
            <div class={styles.label_input}>
                <label htmlFor="descricao">Descrição:</label>
                <input onChange={(event)=>{ atualizarEstado(setDescricao, event.target.value )}} value={descricao} id="descricao" placeholder="Informe uma descrição" type="text"/>
                {ehDescricaoValido ? "": <p class={styles.error_message}>A descrição deve conter entre 3 e 150 caracteres.</p>}
            </div>
            <div class={styles.label_input}>
                <label htmlFor="url">Capa do filme:</label>
                <input onChange={(event)=>{ atualizarEstado(setUrl, event.target.value )}} value={url} id="url" placeholder="Informe o link para a imagem" type="text" />
                {ehUrlValido ? "": <p class={styles.error_message}>O link deve conter entre 3 e 250 caracteres.</p>}
            </div>
            <div class={styles.label_input}>
                <label htmlFor="genero">Gênero:</label>
                <select value={genero} onChange={(event)=>{ atualizarEstado(setGenero, event.target.value )}} name="genero" id="genero">
                    {generos.length < 1 ? <option value="#">Nenhum genêro encontrado</option> 
                    : generos.map(genero => <option key={genero.idGenero} value={genero.idGenero}>{genero.nome}</option>)}
                </select>
                {ehGeneroValido ? "": <p class={styles.error_message}>Selecione um gênero válido.</p>}
            </div>
            <button class={styles.botao} type="submit" >Cadastrar filme</button>
        </form>
    );
}