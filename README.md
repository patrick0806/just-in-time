# Just in Time  API

## Project status: In Development

Este é o projeto de uma api para um sistema de controle de ponto de hora. Nele sera possivel gerenciar as horas de cada trabalhador da equipe se eles tem horas extras, ou horas faltantes sera possivel ver relátorios detalhados.

Nessa aplicação quero utilizar alguns conceitos como Filas para processar os pontos recebidos em segundo plano. A api tem a ideia de servir uma plataforma white label também.

# API Development Process

This project is based on [NestJS](https://docs.nestjs.com/)

To running this project in dev mode you need threee things:

1. install dependences
2. Configure a local database
3. Run migrations
4. Run the app

These three steps are covered in sequence below

## Installation

```bash
yarn
```

## Docker-compose
In this project inside of dev folder we have a docker-compose with the project dependencies like Database and Redis
to start this dependencies run this command:
```bash
cd dev && docker-compose up -d
```

## How create and run migrations
```bash
  yarn typeorm migration:create src/config/database/migrations/<migration name>
``

```bash
  yarn typeorm migration:run -- -d ./ormconfig.ts
```


```bash
  yarn typeorm migration:revert -d ormconfig.ts
```

## Running the app

First, you need create a `.env` file at the project root:

```bash
######################
######ENV VARS########
######################
DATABASE_HOST=localhost
DATABASE_NAME=just-in-time
DATABASE_USERNAME=root
DATABASE_PASSWORD=123
DATABASE_PORT=5432

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=batata
JWT_EXPIRES_IN=2d
```

Then, you can run as follows:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

# Reflection

I created this project to see what it would be like to start a product project from scratch, where I would have to make all the decisions and choose what to use, and come to understand more about integrations with other apis.

I still don't know how long this project will take to finish but I want to add some things to it as a study, to give a proper focus on them which are:

- Documentation (Swagger)
- TDD
- Tests
- CI/CD
- Logs and monitorin

## Swagger route is http://localhost:3000/api/v1/docs