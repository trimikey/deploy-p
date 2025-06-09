import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import open from 'open'; // Changed from import * as open

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://deploy-p-3.onrender.com',
      // Add other allowed origins here
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the deployed application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  try {
    // Only open in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Swagger UI opened at http://localhost:${port}/api`);
    }
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(0);
});