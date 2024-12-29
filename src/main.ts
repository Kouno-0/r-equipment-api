/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/Module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ウィジェットからのアクセス許可
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  // });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);

    // Swaggerの設定
    const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for the application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UIのエンドポイント設定
}
bootstrap();
