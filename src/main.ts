import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import {} from './users/users.module';
import {} from './users/users.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix('api/v1')
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log(`listening on port ${await app.getUrl()}`)
}
bootstrap();
