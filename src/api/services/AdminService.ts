import { Service } from 'typedi';
import { GaxiosResponse } from 'gaxios';
import { env } from '../../env';
import { Logger } from '../../lib/logger';
import { google } from 'googleapis';
import { SecurityService } from './SecurityService';

const cloudScheduler = google.cloudscheduler('v1');
const log = new Logger();

@Service()
export class AdminService {

  public listLocations(): Promise<any> {
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name: 'projects/' + env.gcp.projectId,
            auth,
          };

          cloudScheduler.projects.locations
            .list(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          log.debug('process failed: ', err);
          resolve(err);
        });
    });
  }
}
