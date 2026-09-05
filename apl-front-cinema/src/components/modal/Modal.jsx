import styles from "./Modal.module.css"

export function Modal(props){

    return (
        <div className={styles.background_modal}>
            <div className={styles.modal}>
                <h2>{props.titulo}</h2>
                <h5>{props.tituloFilme}</h5>
                <p>{props.mensagem}</p>
                <div className={styles.botoes}>
                    <button className={styles.fechar} onClick={()=>{props.fechar()}}>Cancelar</button>
                    <button className={styles.acao} onClick={()=>{props.acao(props.params)}}>{props.acaoTexto}</button>
                </div>
            </div>
        </div>
    );
}