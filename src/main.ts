import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 3030;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Jewelry-shop')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, Postgres, sequilize')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`\nServer started has been on ${PORT} port...`);
  });
}

start();
