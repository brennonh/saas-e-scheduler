import { env } from '../env';
import { Logger } from '../lib/logger';
import chalk from 'chalk';

export function banner(log: Logger): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.exposedPort}`;
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info('Microservice  : ' + chalk.yellow(env.app.name));
        log.info('Version       : ' + chalk.yellow(env.app.version));
        log.info(`Environment   : ${env.node}`);
        log.info(``);
        log.info(`API Info      : ${route()}${env.app.routePrefix}`);
        if (env.swagger.enabled) {
            log.info(`Swagger       : ${route()}${env.swagger.route}`);
            log.info(`Swagger Stats : ${route()}${env.swagger.swaggerStatsRoute}`);
        }
        log.info('-------------------------------------------------------');
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info('');
    } else {
        log.info(`Application is up and running.`);
    }
}
