import { useState } from "react";
import { FormularioCadastro } from "../../components/formularioCadastro/FormularioCadastro";
import styles from "./CadastroFilme.module.css"


export function CadastroFilme(){

    const[mensagemErro, setMensagemErro] = useState("")

    return(
      <main class={styles.corpo}>
        <h2 class={styles.titulo}>Cadastro de filmes</h2>
        <FormularioCadastro mostrarErro={setMensagemErro}></FormularioCadastro>
        <p class={styles.mensagemErro}>{mensagemErro}</p>
      </main>  
    );
}