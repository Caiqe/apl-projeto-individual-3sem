import { useState } from 'react'
import styles from "./style.module.css"
import './App.css'
import { Header } from './comum/header/Header'
import { Container } from './comum/container/Container'
import { ListaFilmes } from './pages/listaFilmes/ListaFilmes'
import { FormularioCadastro } from './components/formularioCadastro/FormularioCadastro'
import { CadastroFilme } from './pages/cadastroFilmes/CadastroFilme'

function App() {

  return (
    <>
      <Header></Header>
      <Container>
        {/*<ListaFilmes></ListaFilmes>*/}
        <CadastroFilme></CadastroFilme>
      </Container>
    </>
  )
}

export default App
