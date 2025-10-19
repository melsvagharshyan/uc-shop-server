import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    express.json({ limit: '50mb' }), // Adjust as needed
    express.urlencoded({ limit: '50mb', extended: true }),
  );

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://uc-shop-fe.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
