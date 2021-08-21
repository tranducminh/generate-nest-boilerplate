import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCsrf from 'fastify-csrf';
import fastifyCookie from 'fastify-cookie';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exceptions/all-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { COOKIE_AUTH_NAME } from '@common/constants/cookie.const';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors({
    origin: '*', // TODO: change this if necessary
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });

  const config = app.get(ConfigService);

  app.register(fastifyCookie, {
    secret: config.get<string>('COOKIE_SECRET'),
  });

  app.register(fastifyCsrf);

  app.useGlobalFilters(new AllExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('My app')
    .setDescription('My app description')
    .setVersion('1.0')
    .addCookieAuth(COOKIE_AUTH_NAME)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, 'views'),
  });

  await app.listen(config.get<number>('APP_PORT') || 8000);
}
bootstrap();
