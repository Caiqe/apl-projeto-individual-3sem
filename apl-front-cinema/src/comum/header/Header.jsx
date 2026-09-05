
import styles from "./Header.module.css";

export function Header(){
    return (
        <header>
            <img className={styles.logo} src="../../../public/logo.png" alt="logo do site - pipoca, tela e claquete" />
            <h1 className={styles.titulo}>APL - Cinema</h1>
        </header>
    );
}