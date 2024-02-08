# Just in Time  API

## Project status: In Development

This is the API for a financial management system, where we have functions to not only see our financial health, but the financial health of our family as a whole

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

## The Database (PostgreSQL)

#### Create database

```bash
  docker run --name just-in-time-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=just-in-time \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=123 \
    -d postgres:14.4-alpine
```

#### Stop Database

```bash
docker stop just-in-time-postgres
```

#### Remove database

```bash
docker rm just-in-time-postgres
```

## How create and run migrations
```bash
  npx typeorm migration:create src/config/database/migrations/<migration name>
```

```bash
  npx typeorm migration:run
```

## Running the app

First, you need create a `.env` file at the project root:

```bash
######################
######ENV VARS########
######################
DATABASE_HOST=localhost
DATABASE_NAME=just-in-time-postgres
DATABASE_USERNAME=root
DATABASE_PASSWORD=123
DATABASE_PORT=5432

JWT_SECRET=batata
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