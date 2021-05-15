## 💻 Projeto

Esse projeto foi desenvolvido durante o projeto de extensão da universidade Unochapecó em conjunto a empresa Kemia.

Este projeto é uma aplicação que consiste em fazer o gerenciamento de parâmetros de um sistema de uma empresa de tratamento de efluentes. Podemos citar algumas features como:
  - CRUDs.
  - Autenticação.
  - Envio de e-mail.
  - Envio de notificação.
  - Upload de arquivos.

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Adonisjs](https://adonisjs.com)
- [Postgresql](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)


### 🔶 Adonis 4.1 API application dependencies

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

```bash
https://adonisjs.com/docs/4.1/installation
```

## Ambiente de desenvolvimento

Criar o arquivo .env - baseado no .env.example

```bash
node --version
v12.18.3

adonis --version
4.1.0

yarn --version
1.22.4
```

## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `yarn`
```bash
yarn install
```
- Execute as migrations
```bash
adonis migration:run
```
- Inicie o servidor com `yarn`
```bash
yarn dev
```
- A aplicação pode ser acessada em [`localhost:3333`](http://localhost:3333).

- Você pode verificar uma pequena documentação das rotas da API através da collection exportada via Postman, os arquivos da collection estão na pasta ./docs

---

Feito com ♥ by Rafael Angonese
