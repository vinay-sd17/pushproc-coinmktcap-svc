import {TypeOrmModuleOptions} from '@nestjs/typeorm';

require('dotenv').config();

console.log("***********DB CONFIG***************")
console.log("******** using: " + (process.env['run_mode'] === undefined ? "LOCALHOST" : process.env['run_mode']) + "  ************")
console.log("************************** \n")

let config;
const DB_NAME = "kh-db-w3";

if (process.env['run_mode'] === "prod") {
  // Load param store from AWS for production env, else use stage db
  let connectionString = null;
  console.log("code build initiator is: " + process.env['CODEBUILD_INITIATOR']);
  if (process.env['CODEBUILD_INITIATOR'] !== undefined && process.env['CODEBUILD_INITIATOR'].includes("prod-ipx")) {
    if (process.env['PROD_MONGO_DB'] !== undefined && process.env['PROD_MONGO_DB'] !== "") {
      console.log("Set connection to actual prod db")
      connectionString = process.env['PROD_MONGO_DB'];
    }
  }

  if (connectionString === null) {
    console.log("Fallback Set connection to stage prod db");
    connectionString = "todo"
  }
  connectionString = connectionString + '/' + DB_NAME

  config = {
    "name": "default",
    "type": "mongodb",
    "url": connectionString,
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "entities": [
      "dist/**/*.entity{ .ts,.js}"
    ],
    "synchronize": true,
    "migrations": [
      "dist/migrations/*{.ts,.js}"
    ],
    "migrationsTableName": "migrations_typeorm",
    "migrationsRun": true,
    "logging": true
  } as TypeOrmModuleOptions
} else {
  config = {
    "name": "default",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": DB_NAME,
    "entities": [
      "dist/**/*.entity{ .ts,.js}"
    ],
    "synchronize": true,
    "migrations": [
      "dist/migrations/*{.ts,.js}"
    ],
    "migrationsTableName": "migrations_typeorm",
    "migrationsRun": true,
    "logging": true
  } as TypeOrmModuleOptions
}

export const ormconfig = [config];
