import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

export function Header(){
    return (
        <header>
            <img class={styles.logo} src={logo} alt="logo do site - pipoca, tela e claquete" />
            <h1 class={styles.titulo}>APL - Cinema</h1>
        </header>
    );
}