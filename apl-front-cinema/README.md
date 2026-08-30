# APL - Cinema (Front-end)

Projeto acadêmico de uma aplicação **Front-end em React** para gerenciamento de filmes, integrada à API REST desenvolvida na disciplina de Programação Web ([API Cinema - Filmes](../api-cinema)). Permite cadastrar, listar e remover filmes, consultando os dados diretamente pela API.

## Sumário

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Páginas e componentes](#páginas-e-componentes)
- [Integração com a API](#integração-com-a-api)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Autor](#autor)

---

## Tecnologias utilizadas

- React
- Vite
- React Router (`routes.jsx`)
- CSS Modules
- JavaScript (JSX)

## Estrutura do projeto

```
apl-front-cinema
├── index.html
├── package.json
├── public
│  ├── favicon.svg
│  └── icons.svg
├── src
│  ├── App.jsx
│  ├── App.css
│  ├── main.jsx
│  ├── routes.jsx
│  ├── style.module.css
│  ├── index.css
│  ├── assets
│  │  ├── loading.gif
│  │  ├── logo.png
│  │  └── movie-icon.svg
│  ├── comum
│  │  ├── container
│  │  │  ├── Container.jsx
│  │  │  └── Container.module.css
│  │  ├── header
│  │     ├── Header.jsx
│  │     └── Header.module.css
│  │  
│  ├── components
│  │  ├── cardFilme
│  │  │  ├── CardFilme.jsx
│  │  │  └── CardFilme.module.css
│  │  ├── formularioCadastro
│  │  │  ├── FormularioCadastro.jsx
│  │  │  └── FormularioCadastro.module.css
│  │  └── modal
│  │     ├── Modal.jsx
│  │     └── Modal.module.css
│  └── pages
│     ├── cadastroFilmes
│     │  ├── CadastroFilme.jsx
│     │  └── CadastroFilme.module.css
│     └── listaFilmes
│        ├── ListaFilmes.jsx
│        └── ListaFilmes.module.css
└── vite.config.js
```

O projeto segue uma separação clara de responsabilidades:

- **`comum/`** — componentes estruturais reutilizados em toda a aplicação (`Header`, `Container`).
- **`components/`** — componentes de domínio, específicos das telas de filmes (`CardFilme`, `FormularioCadastro`, `Modal`).
- **`pages/`** — páginas da aplicação, responsáveis por orquestrar os componentes e a comunicação com a API.
- **`routes.jsx`** — define as rotas da aplicação e qual página é renderizada em cada uma.

## Páginas e componentes

### CadastroFilme (`pages/cadastroFilmes`)

Página responsável pelo cadastro de novos filmes. Renderiza o componente `FormularioCadastro`, responsável pelos campos do formulário e pelo envio dos dados via `POST /filmes`.

O formulário utiliza os mesmos campos definidos no back-end:

| Campo      | Descrição                                              |
|------------|----------------------------------------------------------|
| Título     | Título do filme                                           |
| Descrição  | Sinopse/descrição do filme                                |
| Diretor    | Nome do diretor                                            |
| URL        | Link da imagem/pôster do filme                             |
| Gênero     | Selecionado em um `<select>` populado dinamicamente via `GET /generos` |

### ListaFilmes (`pages/listaFilmes`)

Página responsável pela exibição dos filmes cadastrados. Consome a API via `GET /filmes` e renderiza a lista utilizando o componente `CardFilme` para cada item. Também é responsável por acionar a remoção de filmes (`DELETE /filmes/{id}`), com uso do componente `Modal` para confirmação da ação.

### Componentes comuns

- **Header** — cabeçalho fixo da aplicação, com identidade visual do tema cinema.
- **Container** — wrapper de layout reutilizado nas páginas.

## Integração com a API

A aplicação consome a API REST **API Cinema - Filmes** (Java + Spring Boot), executada localmente em `http://localhost:8080`. A URL base está fixa diretamente no código das requisições (sem uso de variáveis de ambiente).

Endpoints consumidos:

| Método | Endpoint                  | Utilizado em                        |
|--------|----------------------------|--------------------------------------|
| GET    | `/filmes`                  | Listagem de filmes (`ListaFilmes`)   |
| GET    | `/generos`                 | Preenchimento do select de gênero (`FormularioCadastro`) |
| POST   | `/filmes`                  | Cadastro de novo filme (`FormularioCadastro`) |
| DELETE | `/filmes/{id}`             | Remoção de filme (`ListaFilmes` + `Modal`) |

> ⚠️ É necessário que a API back-end esteja em execução em `localhost:8080` para que a aplicação funcione corretamente, já que não há dados estáticos ou simulados — todas as informações exibidas são obtidas diretamente da API.

## Como rodar o projeto

1. Clone o repositório.
2. Acesse a pasta do front-end:

```bash
cd apl-front-cinema
```

3. Instale as dependências:

```bash
npm i
```

4. Certifique-se de que a API back-end (**API Cinema - Filmes**) está em execução em `http://localhost:8080`.

5. Rode a aplicação:

```bash
npm run dev
```

6. A aplicação estará disponível em:

```
http://localhost:5173
```


---

## Autor

Projeto acadêmico individual — Front-end de aplicação de gerenciamento de filmes (tema: cinema).
<br><br><strong><u>[By: Caique Gomes 👩🏻‍💻](https://github.com/Caiqe)
