
require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: false}});
import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { iocLoader } from './loaders/iocLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
import { catchAllLoader } from './loaders/catchAllLoader';
import { buildSwagger } from './utils/swaggerBuilder';
import { env } from './env';

const log = new Logger();

if (env.isDevelopment) {
  buildSwagger();
}

const loadersArr = [ winstonLoader,
  iocLoader,
  eventDispatchLoader,
  expressLoader,
  swaggerLoader,
  catchAllLoader];

  if (!env.db.disabled) {
    loadersArr.push(typeormLoader);
  }

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: loadersArr,
})
.then(() => banner(log))
.catch(error => log.error('Application has crashed: ' + error));
