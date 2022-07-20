import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const whitelist = [
    'https://sensational-cocada-df9e56.netlify.app',
    'https://www.sensational-cocada-df9e56.netlify.app',
  ];
  app.enableCors();
  await app.listen(PORT || 3000);
}
bootstrap();
