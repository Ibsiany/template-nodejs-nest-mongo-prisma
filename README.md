<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# CHAMELEON STACK - KANBAN

## Docker Configuration

The first step is to configure Docker. For each operating system, you need to follow a step-by-step guide:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (WSL installation and configuration required)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- macOS

```
               https://docs.docker.com/desktop/install/mac-install/
```

## Installing the Container for Project Execution

To install the container that will run your project, you need to execute the following command in the terminal:

```
docker run --name mongo -e MONGO_PASSWORD=mypassword -p 27017:27017 -d mongo
```

# CHAMELEON STACK - KANBAN

### 📋 PREREQUISITES

- Docker
- NodeJs
- NPM

## 🔧 INSTALLATION PREREQUISITES

### Installing NodeJS

Access the following link and download the LTS version

```
    https://nodejs.org/en
```

After that, just double-click on the file that was downloaded and install Node by clicking next until it is installed. Run the following command in a terminal (cmd, gitbash or others) to check the version:

```
    node --version
```

Also, check the installed NPM version:

```
    npm --version
```

### Installing Docker

The first step is to set up Docker. For each operating system, you need to follow a step-by-step process:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (WSL installation and configuration are required)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- macOS

```
               https://docs.docker.com/desktop/install/mac-install/
```

### Installing the Container for the Project

To install the container that will run in the project, you need to enter the following command in the terminal:

```
docker run --name mongo -e MONGO_PASSWORD=mypassword -p 27017:27017 -d mongo
```

#### In this step, install a DBMS and connect with docker credentials

## ⚙️ CONFIGURING THE PROJECT

### Adding Database Connection Values to .env

Connect to the database created with the variables you used to create the Docker image.
Create a file called ".env" at the root of the project and add the variables contained in the ".env.example" file with the value of the database connection URL(mongo://username:password@localhost:5432/database_name). The ".env" file, according to the container you created, would look something like this:

```
MONGODB_URI=mongo://mongo:mypassword@localhost:27017/chameleon
NODE_ENV=dev
```

## Installation

```bash
$ npm install
```

### Add tables

To add the project's tables to your database, it is necessary to make a POST request to the required table using one of the routes:

```
Create User table: POST  https://localhost:3333/user
Create Card table: POST  https://localhost:3333/card/{user_id}
Create Category table: POST  https://localhost:3333/category/{user_id}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ibsiany Dias](https://github.com/Ibsiany)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
