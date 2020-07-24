import { setConnection } from 'typeorm-seeding';

import { migrateDatabase, dropDatabase } from '../../database';
import { bootstrapApp, BootstrapSettings } from './bootstrap';

export function prepareServer(options?: { migrate: boolean }): Promise<BootstrapSettings> {
    return bootstrapApp().then((settings: BootstrapSettings) => {
        setConnection(settings.connection);

        if (options && options.migrate) {
            return dropDatabase(settings.connection)
                .then(() => migrateDatabase(settings.connection))
                .then(() => {
                    return settings;
                }
                );
        }
        return settings;
    });
}
