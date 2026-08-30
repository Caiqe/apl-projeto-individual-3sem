import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"


export function Navbar(){

    return(

        <div>
            <Link to="">Filmes</Link>
            <Link to="/cadastro">Cadastrar</Link>
        </div>

    );
}