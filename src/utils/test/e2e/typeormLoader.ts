import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { createDatabaseConnection } from '../../database';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    await createDatabaseConnection().then((connection) => {
        if (settings) {
            settings.setData('connection', connection);
            settings.onShutdown(() => connection.close());
        }

    });
};
