# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


# Ambiente de desenvolvimento

Criar o arquivo .env - baseado no .env.example

1. Node versão local: v12.18.3
2. Adonis versão local: 4.0.12
3. Yarn or NPM

```bash
https://adonisjs.com/docs/4.1/installation
```

```bash
yarn 
```

or

```bash
npm install 
```

and

```bash
adonis migration:run
```

and 

```bash
adonis serve --dev
```
Verificar o seus localhost

```bash
http://localhost:3333/
```
