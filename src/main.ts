import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import { merge } from 'lodash';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Js Project Demo')
    .setDescription('hehe')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  // const numbers = [
  //   { key: 175, c: 3 },
  //   { key: 55, c: 2 },
  // ];
  // let objectNumbers = {};

  // const listUser = [
  //   { 175: { a: 1, b: 2 } },
  //   { 55: { a: 3, b: 4 } },
  //   { 23: { a: 8, b: 6 } },
  // ];

  // numbers.forEach((number) => {
  //   objectNumbers = {
  //     ...objectNumbers,
  //     [number.key]: {
  //       c: number.c,
  //     },
  //   };
  // });

  // const newListUser = listUser.reduce((accumulator, current) => {
  //   const newArray = Object.entries(current).map(([key, value]) => {
  //     return {
  //       [key]: {
  //         ...value,
  //         ...objectNumbers[key],
  //       },
  //     };
  //   });
  //   return [...accumulator, ...newArray];
  // }, []);
  // console.log(
  //   '🚀 ~ file: main.ts ~ line 56 ~ newListUser ~ newListUser',
  //   newListUser,
  // );

  // const newNumber = numbers.reduce((result, item) => {
  //   const { key, ...c } = item;
  //   result[key] = c;
  //   return result;
  // }, {});
  // const newListUser = listUser.reduce((accumulator, current) => {
  //   const key = Object.keys(current)[0];
  //   accumulator[key] = current[key];
  //   return accumulator;
  // }, {});

  // console.log({ newListUser });
  // console.log({ newListUser });

  // const result = { ...newListUser, ...newListUser };
  // const result = merge(newListUser, objectNumbers);
  // console.log({ result });
}
bootstrap();
