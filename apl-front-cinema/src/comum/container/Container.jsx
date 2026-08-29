import styles from "./Container.module.css"

export function Container ({children}){
    return(
        <div class={styles.container}>
            {children}
        </div>
    );
}