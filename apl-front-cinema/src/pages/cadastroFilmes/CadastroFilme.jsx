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
      <main className={styles.corpo}>
        <Link className={styles.link} to="/">{"< Filmes"}</Link>
        <h2 className={styles.titulo}>Cadastro de filmes</h2>
        <FormularioCadastro mostrarSucesso={setMensagemSucesso} mostrarErro={setMensagemErro}></FormularioCadastro>
        {mensagemErro == "" ? "" : <p className={styles.mensagemErro}>{mensagemErro}</p>} 
        {mensagemSucesso == "" ? "" : <p className={styles.mensagemSucesso}>{mensagemSucesso}</p>} 
      </main>  
    );
}