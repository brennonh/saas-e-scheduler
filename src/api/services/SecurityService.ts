import { Service } from 'typedi';
import { Logger } from '../../lib/logger';
import { google } from 'googleapis';
const log = new Logger();

@Service()
export class SecurityService {

  public static authenticate(): Promise<any> {
    return new Promise((resolve, reject) => {
      google.auth
        .getClient({
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
          // keyFilename: `${env.app.dirs.filesystemRootDir}secrets/scheduler/key.json`,
        })
        .then(auth => {
          resolve(auth);
        })
        .catch(err => {
          log.info('authentication failed brennon: ', err);
          reject(err);
        });
    });
  }
}
