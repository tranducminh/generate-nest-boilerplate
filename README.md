<h1>Generate NestJS Boilerplate</h1>

<div align="left">
  <a href="./LICENSE.MD" target="_blank">
    <img src="https://img.shields.io/github/license/tranducminh/generate-nest-boilerplate">
  </a>

  <img src="https://img.shields.io/badge/version-1.2.0-red">
  
  <a href="https://www.npmjs.com/package/generate-nest-boilerplate" target="_blank">
    <img src="https://img.shields.io/badge/npm-1.2.0-red?style=flat&logo=npm">
  </a>
</div>

<h2>Description</h2>
This generator will help you build your own NestJS app in seconds with CQRS, TypeORM, MySQL, Redis, Typescript, Fastify

<h2>Table of Contents</h2>

- [Create new app](#create-new-app)
- [Setup environments](#setup-environments)
- [Start app](#start-app)
- [Structure](#structure)
- [Features](#features)
  - [CQRS](#cqrs)
  - [Guard](#guard)
  - [Functions](#functions)
    - [_Authentication_](#authentication)
    - [_Refresh token (incoming)_](#refresh-token-incoming)
    - [_Manage device login_](#manage-device-login)
    - [_Two authenticator (incoming)_](#two-authenticator-incoming)
    - [_CRUD users_](#crud-users)
    - [_Reset password_](#reset-password)
    - [_Send mail_](#send-mail)
    - [_Upload file S3 (incoming)_](#upload-file-s3-incoming)
    - [_I18n (incoming)_](#i18n-incoming)
  - [Migrations](#migrations)
  - [Transformers](#transformers)
  - [Exceptions filter](#exceptions-filter)
  - [Rate limiting](#rate-limiting)
  - [Swagger](#swagger)
  - [Compodoc](#compodoc)
  - [Linter](#linter)
- [License](#license)

## Create new app

- ### Using npx

```bash
npx generate-nest-boilerplate {your-app}
```

## Setup environments

- Install dependencies by running ``` yarn install ```
- Create ***.env*** file by running ```cp .env.example .env``` and replace existing env variables

> You can create ***.env.development*** or ***.env.staging*** or ***.env.production*** file depend on your environment

- ### Without using Docker

You have to install `Mysql`, `Redis` and replace respective env variables in env file

- ### Using Docker

```bash
yarn db:setup:local
```

## Start app

For development environment

```bash
yarn migration:run
yarn start:dev
```

For production environment

```bash
yarn migration:run
yarn start:prod
```

By default, the app will be run port 8000

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
 ┃ ┣ 📂mail
 ┃ ┣ 📂modules
 ┃ ┃ ┗ 📂{module-name}
 ┃ ┃ ┃ ┣ 📂commands
 ┃ ┃ ┃ ┃ ┣ 📜{command-name}.admin.command.ts
 ┃ ┃ ┃ ┃ ┣ 📜{command-name}.command.ts
 ┃ ┃ ┃ ┃ ┗ 📜{command-name}.local.command.ts
 ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┣ 📜{module-name}.admin.controller.ts
 ┃ ┃ ┃ ┃ ┗ 📜{module-name}.controller.ts
 ┃ ┃ ┃ ┣ 📂dtos
 ┃ ┃ ┃ ┃ ┣ 📜{dto-name}.admin.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📜{dto-name}.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜{dto-name}.local.dto.ts
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📂queries
 ┃ ┃ ┃ ┃ ┣ 📜{command-name}.admin.query.ts
 ┃ ┃ ┃ ┃ ┣ 📜{command-name}.query.ts
 ┃ ┃ ┃ ┃ ┗ 📜{command-name}.local.query.ts
 ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┃ ┣ 📜{module-name}.admin.service.ts
 ┃ ┃ ┃ ┃ ┗ 📜{module-name}.service.ts
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

_**Naming rules:**_

- ```{file-name}.{file-type}.ts```: file only for ```user``` permission or lower
- ```{file-name}.admin.{file-type}.ts```: file only for ```admin``` permission or higher
- ```{file-name}.local.{file-type}.ts```: file only use in logic code, not use in ```service``` or ```controller``` folder

_**DTO files is divided into 2 types**_: ```input dto``` and ```output dto```

- Input dto file example: [```create-user.dto.ts```](https://github.com/tranducminh/generate-nest-boilerplate/blob/master/src/modules/users/dtos/create-user.dto.ts)
- Output dto file example: [```user.dto.ts```](https://github.com/tranducminh/generate-nest-boilerplate/blob/master/src/modules/users/dtos/user.dto.ts)

## Features

### CQRS

In most cases, structure ```model --> repository --> service --> controller``` is sufficient. However, when our requirements become more complex, the ```CQRS``` pattern may be more appropriate and scalable.  
You can defined commands and queries in ```commands``` and ```queries``` folder in each module.

### Guard

- #### _Authentication_

The boilerplate has been installed ```passport``` and ```jwt```.  
```jwt token``` is installed in ```cookies``` that auto be sent with each request.  
It can be enabled by adding ```JwtAuthGuard``` to necessary routes in controller files.

```bash
@UseGuards(JwtAuthGuard)
```

The ```JwtAuthGuard``` uses combination of ```Redis``` and ```Mysql``` database to optimize the speed of the app

- #### _Permissions_

To enable the permission guard, add ```PermissionGuard``` to necessary routes in controller files.

```bash
@UseGuards(PermissionGuard)
```

Some permissions have been installed. Visit file [```src/common/constants/permission.const.ts```](https://github.com/tranducminh/generate-nest-boilerplate/blob/master/src/common/constants/permission.const.ts) to view detail.

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

- #### _Account status_

To enabled this guard, add this code ```@UseGuards(UserStatusGuard)```

User account has 3 status:

- ```PENDING```: User register new account and account has not been activated by email
- ```ACTIVE```: Account has been activated by activation email
- ```BLOCKED```: Account has been blocked by admin

Only ```ACTIVE``` account can login to the app.

### Functions

- #### _Authentication_
  
  - Login: ```/auth/login```
  - Signup: ```/auth/signup```
  - Logout: ```/auth/logout```

- #### _Refresh token (incoming)_

- #### _Manage device login_

  _API prefix_: ```/auth/devices```

  - Get all device information which is logined
  - Get current device infomation
  - Logout all device
  - Logout one device

- #### _Two authenticator (incoming)_

- #### _CRUD users_

  _API prefix_: ```/users``` and ```/admin/users```

  - CRUD ```user``` by ```admin```, ```super_admin```
  - CRUD ```admin``` by ```super_admin```

- #### _Reset password_

  _API prefix_: ```/auth/reset-password```

  - By current password
  - By email verification
  - By google authenticator (incoming)

- #### _Send mail_

  - Send mail to activate account
  - Send mail to reset password
  
  Visit [```src/mail/commands```](https://github.com/tranducminh/generate-nest-boilerplate/tree/master/src/mail/commands) for details

- #### _Upload file S3 (incoming)_

- #### _I18n (incoming)_

### Migrations

- #### _Create migration_

Create new migration by running

```bash
yarn migration:generate {name-of-migration}
```

The new migration will be created in ```src/databases/migrations```.

- #### _Run migration_

```bash
yarn migration:run
```

- #### _Revert migration_

```bash
yarn migration:revert
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
  message: "Successfully"
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

### Linter

```eslint``` + ```prettier``` = ❤️

## License

The MIT License. Please see License File for more information. Copyright © 2021 Tran Duc Minh.

Made with ❤️ by [Tran Duc Minh](https://github.com/tranducminh)
