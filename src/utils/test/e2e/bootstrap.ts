import { Application } from 'express';
import * as http from 'http';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { Connection } from 'typeorm/connection/Connection';

import { eventDispatchLoader } from '../../../loaders/eventDispatchLoader';
import { expressLoader } from '../../../loaders/expressLoader';
import { homeLoader } from '../../../loaders/homeLoader';
import { iocLoader } from '../../../loaders/iocLoader';
import { winstonLoader } from '../../../loaders/winstonLoader';
import { typeormLoader } from './typeormLoader';
import { catchAllLoader } from '../../../loaders/catchAllLoader';

export interface BootstrapSettings {
    app: Application;
    server: http.Server;
    connection: Connection;
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
    return bootstrapMicroframework({
        loaders: [
            winstonLoader,
            iocLoader,
            eventDispatchLoader,
            typeormLoader,
            expressLoader,
            homeLoader,
            catchAllLoader,
        ],
    }).then((framework) => {
        return {
            app: framework.settings.getData('express_app') as Application,
            server: framework.settings.getData('express_server') as http.Server,
            connection: framework.settings.getData('connection') as Connection,
        } as BootstrapSettings;

    });
};
