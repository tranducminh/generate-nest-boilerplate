<h1>Generate NestJS Boilerplate</h1>

<div align="left">
  <a href="./LICENSE.MD" target="_blank">
    <img src="https://img.shields.io/github/license/tranducminh/generate-nest-boilerplate">
  </a>

  <img src="https://img.shields.io/badge/version-1.0-red">
  
  <a href="https://www.npmjs.com/package/generate-nest-boilerplate" target="_blank">
    <img src="https://img.shields.io/badge/npm-1.0.0-red?style=flat&logo=npm">
  </a>
</div>

<h2>Description</h2>
This generator will help you build your own NestJS app in seconds with CQRS, TypeORM, MySQL, Redis, Typescript, Fastify

<h2>Table of Contents</h2>

- [Create new app](#create-new-app)
  - [Using npx](#using-npx)
- [Setup environments](#setup-environments)
  - [Without using Docker](#without-using-docker)
  - [Using Docker](#using-docker)
- [Start app](#start-app)
- [Migrations](#migrations)
  - [Create migration](#create-migration)
  - [Run migration](#run-migration)
  - [Revert migration](#revert-migration)
- [Structure](#structure)
- [Features](#features)
  - [CQRS](#cqrs)
  - [Authentication](#authentication)
  - [Permissions](#permissions)
  - [Transformers](#transformers)
  - [Exceptions filter](#exceptions-filter)
  - [Rate limiting](#rate-limiting)
  - [Swagger](#swagger)
  - [Compodoc](#compodoc)
- [License](#license)

## Create new app

### Using npx

```bash
npx generate-nest-boilerplate {your-app}
```

## Setup environments

- Install dependencies by running ``` yarn install ```
- Create ***.env*** file by running ```cp .env.example .env``` and replace existing env variables

> You can create ***.env.development*** or ***.env.staging*** or ***.env.production*** file depend on your environment

### Without using Docker

You have to install `Mysql`, `Redis` and replace respective env variables in env file

### Using Docker

```bash
yarn db:setup:local
```

## Start app

For development environment

```bash
yarn start:dev
```

For production environment

```bash
yarn start:prod
```

By default, the app will be run port 8000

## Migrations

### Create migration

Create new migration by running

```bash
yarn migration:generate {name-of-migration}
```

The new migration will be created in ```src/databases/migrations```.

### Run migration

```bash
yarn migration:run
```

### Revert migration

```bash
yarn migration:revert
```

## Structure

```bash
📦{your-app}
 ┣ 📂src
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┗ 📂entities
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂decorators
 ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┗ 📂exceptions
 ┃ ┣ 📂configs
 ┃ ┃ ┣ 📂app
 ┃ ┃ ┣ 📂database
 ┃ ┃ ┣ 📂queue
 ┃ ┃ ┗ 📜config.module.ts
 ┃ ┣ 📂databases
 ┃ ┃ ┣ 📂factories
 ┃ ┃ ┣ 📂migrations
 ┃ ┃ ┗ 📂seeds
 ┃ ┣ 📂guards
 ┃ ┣ 📂jobs
 ┃ ┣ 📂mails
 ┃ ┣ 📂modules
 ┃ ┃ ┗ 📂{module-name}
 ┃ ┃ ┃ ┣ 📂commands
 ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📂queries
 ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┗ 📜{module-name}.module.ts
 ┃ ┣ 📂utils
 ┃ ┣ 📂views
 ┃ ┣ 📜app.controller.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.service.ts
 ┃ ┗ 📜main.ts
 ┣ 📜.env.example
 ┣ 📜docker-compose.yml
 ┣ 📜ormconfig.js
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

## Features

### CQRS

In most cases, structure ```model --> repository --> service --> controller``` is sufficient. However, when our requirements become more complex, the ```CQRS``` pattern may be more appropriate and scalable.
You can defined commands and queries in ```commands``` and ```queries``` folder in each module.

### Authentication

The boilerplate has been installed ```passport``` and ```jwt```.
It can be enabled by adding ```JwtAuthGuard``` to necessary routes in controller files.

```bash
@UseGuards(JwtAuthGuard)
```

The ```JwtAuthGuard``` uses combination of ```Redis``` and ```Mysql``` database to optimize the speed of the app

### Permissions

To enable the permission guard, add ```PermissionGuard``` to necessary routes in controller files.

```bash
@UseGuards(PermissionGuard)
```

Some permissions have been installed. Visit file ```src/common/constants/permission.const.ts``` to view detail.

```bash
Role {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'user',
}

User {
  CREATE = 'user:create',
  READ = 'user:read',
  UPDATE = 'user:update',
  DELETE = 'user:delete',
}
```

### Transformers

- Convert ```entity``` to ```dto``` to remove unnecessary properties in returned data such as ```password```. The method ```toDto``` is installed for each entity. It can be used like that

```bash
user.toDto()
```

- Convert ```dto``` to ```response``` to format the response that return to client. All the response will be format like that

```bash
{
  data: ...
  status: 200,
  message: "Successfull"
}
```

The method ```toResponse``` is installed for each entity. It can be used like that

```bash
user.toResponse(HttpStatus.CREATED, 'Create user successfully')
```

With the response has not return data. You can use method ```generateEmptyRes```

```bash
generateEmptyRes(HttpStatus.OK, "Update user successfully");
```

### Exceptions filter

All exceptions will be catched and returned with format

```bash
{
  status: 403,
  timestamp: "Sun, 01 Aug 2021 04:35:40 GMT",
  message: "Forbidden resource",
  path:"/users",
}
```

### Rate limiting

Rate limiting is configured by ```@nestjs/throttler```.
By default, limit 100 requests per 60s
Visit ```app.module.ts``` to change this.

### Swagger

All APIs are described in Swagger. To see all available endpoints visit [http://localhost:8000/api/static/index.html](http://localhost:8000/api/static/index.html)

### Compodoc

```bash
yarn compodoc
```

By default, you can see the compodoc on [http://localhost:8080](http://localhost:8080)

## License

The MIT License. Please see License File for more information. Copyright © 2021 Tran Duc Minh.

Made with ❤️ by [Tran Duc Minh](https://github.com/tranducminh)
