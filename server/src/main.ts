import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {logAllRequestResponse} from "./common/middleware/logger-middleware";
import {GlobalExceptionHandler} from "./common/exception/global-exception-handler";

const swStats = require('swagger-stats');

async function bootstrap() {
  const port = process.env['PORT'] || 8080;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //Added req res logger middleware
  app.use((request, response, next) => logAllRequestResponse(request, response, next));
  //Added validator middleware
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionHandler());
  //Added swagger docs & ui
  const config = new DocumentBuilder()
      .setTitle('Push Protocol CoinMktCap Service Api Docs')
      .setDescription('Push Protocol CoinMktCap Service Api Documentation and endpoint details')
      .setVersion('1.0')
      .addBearerAuth(
          {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
          'JWT',
      )
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  //Added telemetry
  app.use(swStats.getMiddleware({
    swaggerSpec: document, name: 'Push Protocol CoinMktCap Service Telemetry',
    uriPath: '/metrics',
    authentication: false, // make true if needed
    onAuthenticate: function (req, username, password) {
      // simple check for username and password
      return ((username === 'admin')
          && (password === 'admin'));
    }
  }));
  await app.listen(port);
  console.log("************ Push Protocol CoinMktCap Service started in port: " + port + " ************");
  console.log(`************ Swagger Specs: http://localhost:${port}/swagger/ ************`)
}

bootstrap();
