import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://uc-shop-fe.vercel.app',
      'https://uc-shop-fe-git-master-melsvagharshyans-projects.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Make sure headers you want are allowed
    preflightContinue: false, // Let NestJS handle the preflight
    optionsSuccessStatus: 204, // Set the response status for OPTIONS requests
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
