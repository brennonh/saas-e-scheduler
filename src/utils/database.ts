import { Container } from 'typedi';
import { Connection, createConnection, useContainer } from 'typeorm';

import { env } from '../env';

declare type LoggerOptions = boolean | 'all' | Array<('query' | 'schema' | 'error' | 'warn' | 'info' | 'log' | 'migration')>;

export const createDatabaseConnection = (): Promise<Connection> => {
    useContainer(Container);
    return createConnection({
        type: env.db.type as any, // See createConnection options for valid types
        database: env.db.database,
        logging: env.db.logging as LoggerOptions,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
        username: env.db.username,
        password: env.db.password,
    });
};

export const dropDatabase = (connection: Connection) => {
    return connection.dropDatabase();
};

export const migrateDatabase = (connection: Connection) => {
    return connection.runMigrations();
};

export const closeDatabase = (connection: Connection) => {
    return connection.close();
};
