import { useState } from 'react'
import styles from "./style.module.css"
import './App.css'
import { Header } from './comum/header/Header'
import { Container } from './comum/container/Container'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Navbar } from './comum/navbar/Navbar'

function App() {

  return (
    <>
      <Header></Header>
      
      <Container>
        <RouterProvider router={routes}>
        </RouterProvider>
      </Container>
    </>
  )
}

export default App
