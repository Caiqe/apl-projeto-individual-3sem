import styles from "./CardFilme.module.css";

export function CardFilme(props){
    return (

        <div className={styles.card}>
                <h3 className={styles.titulo}>{props.titulo}</h3>
            <div className={styles.apresentacao}>
                <div>
                    <img className={styles.capa} src={props.imagem} alt={"capa do filme - " + props.titulo} />
                </div>
                <div className={styles.infos}>
                    <h4>Diretor: {props.autor} | Genêro: {props.genero}</h4>
                    <p>{props.descricao}</p>
                </div>
            </div>
            <button className={styles.bttDeletar} onClick={()=> {props.funcDeletar(props.id)}}>Deletar</button>
        </div>
    
    );
}