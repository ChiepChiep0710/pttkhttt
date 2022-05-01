import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { diskStorage } from 'multer';
import { extname } from 'path';
export interface DBConfig {
  uri: string;
}

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  private readonly validationScheme = {
    DB_MONGO_URI: Joi.string().required(),
    APP_URL: Joi.string().required(),
    SALT_ROUND: Joi.string().required(),
    
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
   
    APP_PORT: Joi.number().default(3000),
  
    DOMAIN: Joi.string().required(),
    HTTP: Joi.string().required(),
    API_DOMAIN: Joi.string().required(),
  };

  constructor() {
    const configs: dotenv.DotenvParseOutput[] = [];

    const defaultEnvConfigPath = '.env';
    const defaultEnvConfig = dotenv.config({ path: defaultEnvConfigPath });

    if (defaultEnvConfig.error) {
      // tslint:disable-next-line: no-console
      // console.log(`No config file at path: ${defaultEnvConfigPath}`);
    } else {
      configs.push(defaultEnvConfig.parsed);
      // tslint:disable-next-line: no-console
      // console.log(`Loaded config file at path: ${defaultEnvConfigPath}`);
    }
    this.envConfig = this.validateInput(...configs);
  }

  get dbConfigMongo(): DBConfig {
    return {
      uri: String(this.envConfig.DB_MONGO_URI),
    };
  }

  private validateInput(
    ...envConfig: dotenv.DotenvParseOutput[]
  ): dotenv.DotenvParseOutput {
    const mergedConfig: dotenv.DotenvParseOutput = {};

    envConfig.forEach((config) => Object.assign(mergedConfig, config));

    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const result = envVarsSchema.validate(mergedConfig);
    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }
    return result.value;
  }

  storage = diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      callback(null, this.generateFilename(file));
    },
  });

  generateFilename(file) {
    return `${Date.now()}.${extname(file.originalname)}`;
  }
}
