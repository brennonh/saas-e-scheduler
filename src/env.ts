import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import {
  getOsEnv,
  getOsEnvWithDefault,
  getOsEnvOptional,
  getOsPathsWithDefault,
  normalizePort,
  toBool,
  toNumber,
  getOsPathWithDefault,
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  ),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: (pkg as any).name,
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    routePrefix: getOsEnvOptional('APP_ROUTE_PREFIX') || '/api',
    port: normalizePort(process.env.APP_PORT),
    exposedPort: normalizePort(process.env.APP_EXPOSED_PORT || undefined),
    banner: toBool(getOsEnvOptional('APP_BANNER') || 'true'),
    dirs: {
      filesystemRootDir: getOsEnvWithDefault('FILESYSTEM_ROOT_DIR', '/'),
      migrations: getOsPathsWithDefault('TYPEORM_MIGRATIONS', 'src/database/migrations/**/*.ts'),
      migrationsDir: getOsPathWithDefault('TYPEORM_MIGRATIONS_DIR', 'src/database/migrations'),
      entities: getOsPathsWithDefault('TYPEORM_ENTITIES', 'src/api/models/**/*.ts'),
      entitiesDir: getOsPathWithDefault('TYPEORM_ENTITIES_DIR', 'src/api/models'),
      controllers: getOsPathsWithDefault('CONTROLLERS', 'src/api/controllers/**/*Controller.ts,src/controllers/**/*Controller.ts'),
      middlewares: getOsPathsWithDefault('MIDDLEWARES', 'src/middlewares/**/*Middleware.ts'),
      interceptors: getOsPathsWithDefault('INTERCEPTORS', 'src/interceptors/**/*Interceptor.ts'),
      subscribers: getOsPathsWithDefault('SUBSCRIBERS', 'src/api/subscribers/**/*Subscriber.ts'),
      resolvers: getOsPathsWithDefault('RESOLVERS', 'src/api/resolvers/**/*Resolver.ts'),
    },
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnv('LOG_OUTPUT'),
  },
  db: {
    type: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnvOptional('TYPEORM_HOST'),
    port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
    username: getOsEnvOptional('TYPEORM_USERNAME'),
    password: getOsEnvOptional('TYPEORM_PASSWORD'),
    database: getOsEnv('TYPEORM_DATABASE'),
    synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
    logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    disabled: toBool(getOsEnv('TYPEORM_DISABLED')),
  },
  swagger: {
    enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
    route: getOsEnv('SWAGGER_ROUTE'),
    file: getOsEnv('SWAGGER_FILE'),
    swaggerStatsRoute: getOsEnv('SWAGGER_STATS_ROUTE'),
  },
  gcp: {
    projectId: getOsEnvOptional('GCP_PROJECT_ID'),
    projectLocation: getOsEnvOptional('GCP_PROJECT_LOCATION'),
    schedulerLocation: getOsEnvOptional('GCP_PROJECT_LOCATION'),
    authScope: getOsEnvOptional('GCP_AUTH_SCOPE'),
  },
};
