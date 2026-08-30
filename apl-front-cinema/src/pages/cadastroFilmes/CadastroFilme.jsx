import { useEffect, useState } from "react";
import { FormularioCadastro } from "../../components/formularioCadastro/FormularioCadastro";
import styles from "./CadastroFilme.module.css"
import { Link } from "react-router-dom";


export function CadastroFilme(){

    const[mensagemErro, setMensagemErro] = useState("")
    const[mensagemSucesso, setMensagemSucesso] = useState("")

    useEffect(()=>{
      setTimeout(()=>{
        setMensagemErro("");
        setMensagemSucesso("");
      },2000)
    },[mensagemErro, mensagemSucesso])

    return(
      <main class={styles.corpo}>
        <Link class={styles.link} to="/">{"< Filmes"}</Link>
        <h2 class={styles.titulo}>Cadastro de filmes</h2>
        <FormularioCadastro mostrarSucesso={setMensagemSucesso} mostrarErro={setMensagemErro}></FormularioCadastro>
        {mensagemErro == "" ? "" : <p class={styles.mensagemErro}>{mensagemErro}</p>} 
        {mensagemSucesso == "" ? "" : <p class={styles.mensagemSucesso}>{mensagemSucesso}</p>} 
      </main>  
    );
}