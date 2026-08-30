import { createBrowserRouter } from "react-router-dom";
import { ListaFilmes } from "./pages/listaFilmes/ListaFilmes";
import { CadastroFilme } from "./pages/cadastroFilmes/CadastroFilme";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <ListaFilmes></ListaFilmes>
    },
    {
        path: "/cadastro",
        element: <CadastroFilme></CadastroFilme>
    }
])