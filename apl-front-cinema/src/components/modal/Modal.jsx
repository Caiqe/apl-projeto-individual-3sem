import styles from "./Modal.module.css"

export function Modal(props){

    return (
        <div class={styles.background_modal}>
            <div class={styles.modal}>
                <h2>{props.titulo}</h2>
                <h5>{props.tituloFilme}</h5>
                <p>{props.mensagem}</p>
                <div class={styles.botoes}>
                    <button class={styles.fechar} onClick={()=>{props.fechar()}}>Cancelar</button>
                    <button class={styles.acao} onClick={()=>{props.acao(props.params)}}>{props.acaoTexto}</button>
                </div>
            </div>
        </div>
    );
}