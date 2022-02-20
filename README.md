<div align="center">
  <img src="https://user-images.githubusercontent.com/83426602/148666068-d5a1fccf-e630-45e6-b92f-be8234dc5ea3.jpeg" width="600px"  />
 </div>
  
 <div align="center">
 <img src="https://img.shields.io/badge/Status-under%20construction-orange?style=for-the-badge&logo=appveyor"/>
 <img src="https://img.shields.io/badge/Licence-MIT-blue?style=for-the-badge&logo=appveyor"/>
 <img src="https://img.shields.io/static/v1?label=Compass&message=UOL&color=7159c1&style=for-the-badge&logo=ghost"/>
 </div>
 
 
<div align="center">
 <h1 align="center">Compassolisa</h1>
</div>

<!--ts-->
Tabela de conteúdos
=================
   * [Começando](#começando)
   * [Pré-requisitos](#pré-requisitos)
   * [Dependências](#dependências)
   * [Instalação](#instalação)
   * [Features](#features)
   * [Comandos](#comandos)
   * [Estrutura](#estrutura)
   * [Endpoints](#endpoints)
   * [Payloads](#payloads)
<!--te-->

Começando
=========
API feita com intuito de cadastrar carros para aluguel e registrar pessoas com autenticação.

Pré-requisitos
=========

<a href="https://nodejs.org/pt-br/download/" target="_blank"><img align="center" alt="nodeJs" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"></a> NodeJs  

 <a href="https://www.mongodb.com/" target="_blank"><img align="center" alt="mongodb" height="30" width="40" src="https://img.icons8.com/color/48/000000/mongodb.png"></a> MongoDB  
 
 <a href="https://www.postman.com/downloads/" target="_blank"><img align="center" alt="postman" height="30" width="30" src="https://user-images.githubusercontent.com/82064724/147416090-89b4e7a3-2b78-417a-a154-f47940d23e38.png"></a>   Postman  
 
 <a href="https://code.visualstudio.com/download" target="_blank"><img align="center" alt="VsCode" height="25" width="35" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"></a> VsCode 
 
Dependências
=========
 
| Nome             | Versão                  |
| :-----------------| :-------------------------|
| express             |  4.17.1
| mongoose           |  5.7.7
| axios           |  0.26.0
| bcrypt           |  2.4.3
| compreesion           |  1.7.4
| cors           |  2.8.5
| cross-env           |  7.0.0
| dotenv           |  10.0.0
| express-mongo-sanitize           |  2.0.0
| express-rate-limit           |  5.0.0
| faker-br           |  0.4.1
| helmet           |  4.1.0
| http-status       |  1.4.0
| joi             |  17.3.0
| jsonwebtoken             |  8.5.1
| moment          |  2.29.1
| mongoose-paginate-v2          |  1.5.0
| morgan          |  1.9.1
| passport          |  0.4.0
| passport-jwt          |  4.0.0
| swagger-ui-expres          |  4.3.0
| validator          |  13.0.0
| winston          |  3.2.1
| xss-clean          |  0.1.1

Instalação
=========
 
Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Features
=========
 
- **NoSQL database**: [MongoDB](https://www.mongodb.com) modelagem de dados de objetos usando [Mongoose](https://mongoosejs.com)
- **Autenticação e autorização**: usando [passport](http://www.passportjs.org)
- **Validação**: solicitar validação de dados usando [Joi](https://github.com/hapijs/joi)
- **Logando**: usando [winston](https://github.com/winstonjs/winston) e [morgan](https://github.com/expressjs/morgan)
- **Tratamento de erros**: mecanismo de tratamento de erros centralizado
- **Gerenciamento de processos**: gerenciamento avançado do processo de produção usando [PM2](https://pm2.keymetrics.io)
- **Gerenciamento de dependência**: com [Yarn](https://yarnpkg.com)
- **Variáveis de ambientes**: usando [dotenv](https://github.com/motdotla/dotenv) e [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Segurança**: definir cabeçalhos HTTP de segurança usando [helmet](https://helmetjs.github.io)
- **Santizing**: higienizar dados de solicitação contra xss e injeção de consulta
- **CORS**: Compartilhamento de recursos entre origens ativado usando [cors](https://github.com/expressjs/cors)
- **Compression**: compressão gzip com [compression](https://github.com/expressjs/compression)
- **Cobertura de código**: usando [coveralls](https://coveralls.io)
- **Linting**: com [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: configuração consistente do editor usando [EditorConfig](https://editorconfig.org)

Comandos
=========
  
Executando localmente:

```bash
yarn dev
```

Executando em produção:

```bash
yarn start
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Dotenv arquivo exemplo

As variáveis de ambiente podem ser encontradas e modificadas no arquivo `.env`. Eles vêm com estes valores padrão:
```bash
# Port
PORT=3000

# URL
MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate

# JWT
# JWT secret key
JWT_SECRET=suasenhasecreta
# Número de minutos após o qual um token de acesso expira
JWT_ACCESS_EXPIRATION_MINUTES=30
# Número de dias após o qual um token de atualização expira
JWT_REFRESH_EXPIRATION_DAYS=30
```

Estrutura
=========

```
src\
 |--config\         # Variáveis de ambiente e coisas relacionadas à configuração
 |--controllers\    # Controladores de rota (camada de controlador)
 |--docs\           # Arquivos swagger ( Em produção)
 |--middlewares\    # Middlewares express personalizados
 |--models\         # Modelos mongoose (Schema)
 |--routes\         # Rotas
 |--services\       # Camada de serviço
 |--utils\          # Classes e funções utilitárias
 |--validations\    # Solicitar esquemas de validação de dados
 |--app.js          # Express app
 |--index.js        # Ponto de entrada do aplicativo
```

Endpoints
=========
**Car routes**:\
`POST api/v1/car` - cadastrar carros\
`GET api/v1/car` - buscar todos os carros(com filtros)\
`GET api/v1/car/:carId` - burcar carros por id\
`PATCH api/v1/car/:carId` - atualizar dados de carros\
`DELETE /v1/car/:carId` - deletar carros

**People routes**:\
`POST api/v1/people` - cadastrar pessoa\
`GET api/v1/people` - buscar todos os usuários(com filtros)\
`GET api/v1/people/:peopleId` - burcar pessoa por id\
`PATCH api/v1/people/:peopleId` - atualizar dados de pessoas\
`DELETE /v1/people/:peopleId` - deletar pessoa

**Authentication routes**:\
`POST /v1/auth/authenticate` - logar(gera um token)

Payloads
=========

| Método | Descrição |
|---|---|
| `POST` | Utilizado para cadastrar uma nova pessoa. |

+ 📙: [POST] http://localhost:3000/api/v1/people
+ Request (application/json)
+ Body

     ```json
   {
    "nome": "pedro henriquee",
    "cpf": "197.168.434-95",
    "data_nascimento": "03/01/2003",
    "email": "pedro.mka.13a3@hatmail.com",
    "senha": "12345a",
    "habilitado": "Sim"
   }

### Resposta

| Código | Descrição |
|---|---|
| `201` | Pessoa cadastrada com sucesso (success).|
| `400` | Erro ao registrar uma nova pessoa(bad request).|

+ Retorno

     ```json
  {
    "nome": "pedro henriqueee",
    "cpf": "197.168.434-95",
    "data_nascimento": "03/01/2003",
    "email": "pedro.mka.13a@hatmail.com",
    "habilitado": "Sim",
    "id": "620d7e0483939f1e1c8b90bf"
  }
| Método | Descrição |
|---|---|
| `PUT` | Utilizado para atualizar uma pessoa. |
  + 📙: [PUT] http://localhost:3000/api/v1/people/:peopleId
+ Request (application/json)
+ Body

     ```json
   {
    "nome": "pedro henriquee",
    "cpf": "197.168.435-95",
    "data_nascimento": "03/01/2003",
    "email": "pedro.mka.13a3@hatmail.com",
    "senha": "12345a",
    "habilitado": "Sim"
   }

### Resposta

| Código | Descrição |
|---|---|
| `201` | OK (success).|
| `400` | Erro ao atualizar uma nova pessoa(bad request).|

+ Retorno

     ```json
  {
    "nome": "pedro henriqueee",
    "cpf": "197.168.435-95",
    "data_nascimento": "03/01/2003",
    "email": "pedro.mka.13a@hatmail.com",
    "habilitado": "Sim",
    "id": "620d7e0483939f1e1c8b90bf"
  }
<div align="center">
  <img src="https://user-images.githubusercontent.com/83426602/148673032-78ed82b0-7074-417d-9da5-c183eb915789.gif" width="600px"  />
 </div>

