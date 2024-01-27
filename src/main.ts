import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as swaggerStats from 'swagger-stats';
import { AppModule } from './app.module';
import { initial } from './system/utils/initial';

dotenv.config();

const getHost = (): string => {
  return `http://localhost:3000`;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CHAMELEON STACK')
    .setDescription('CHAMELEON STACK ENDPOINTS')
    .setVersion('1.0')
    .addServer(getHost())
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    swaggerStats.getMiddleware({
      swaggerSpec: document,
      swaggerOnly: true,
      name: 'template-nodejs-nest-mongo',
      hostname: getHost(),
      uriPath: '/observability',
    }),
  );

  await app.listen(3000);

  initial(getHost());
}

bootstrap();
