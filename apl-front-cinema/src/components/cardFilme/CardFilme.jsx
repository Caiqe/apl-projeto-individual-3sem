import styles from "./CardFilme.module.css";

export function CardFilme(props){
    return (

        <div class={styles.card}>
                <h3 class={styles.titulo}>{props.titulo}</h3>
            <div class={styles.apresentacao}>
                <div>
                    <img class={styles.capa} src={props.imagem} alt={"capa do filme - " + props.titulo} />
                </div>
                <div class={styles.infos}>
                    <h4>Diretor: {props.autor} | Genêro: {props.genero}</h4>
                    <p>{props.descricao}</p>
                </div>
            </div>
        </div>
    
    );
}