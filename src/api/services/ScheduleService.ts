import { GaxiosResponse } from 'gaxios';
import { Service } from 'typedi';
import { env } from '../../env';
import { Job } from '../models/Job';
import { Logger } from '../../lib/logger';
import { google } from 'googleapis';
import { SecurityService } from './SecurityService';

const cloudScheduler = google.cloudscheduler('v1');
const log = new Logger();

@Service()
export class ScheduleService {

  public listJobs(): Promise<any> {
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            parent: `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .list(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data.jobs);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          log.debug('process error ' + err);
          resolve(err);
        });
    });
  }

  public async createJob(job: Job): Promise<any> {
    log.debug(`create job for ${JSON.stringify(job)}`);

    const resource: Job = {
      schedule: job.schedule,
      name:
        `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${job.name}`,
      httpTarget: {
        uri: job.httpTarget.uri,
        httpMethod: job.httpTarget.httpMethod,
      },
    };

    // resource.httpTarget.body = Buffer.from(JSON.stringify(job.httpTarget.body)).toString('base64');
    if (job.httpTarget.body) {
      resource.httpTarget.body = job.httpTarget.body;
    }

    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            parent: `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}`,
            resource,
            auth,
          };
          log.debug(JSON.stringify(request));
          cloudScheduler.projects.locations.jobs
            .create(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              resolve(err);
            });
        })
        .catch(err => {
          log.debug('process error ' + err);
          resolve(err);
        });
    });
  }

  public createOrUpdateJob(id: string, resource: Job): Promise<any> {
    log.debug(JSON.stringify(resource));
    return this.getJob(id)
      .then(dbRes => {
        if (dbRes) {
          this.patchJob(id, resource);
        } else {
          this.createJob(resource);
        }
      })
      .catch(e => {
        log.error('-- error -- ');
        this.createJob(resource);
      });
  }

  public deleteJob(id: string): Promise<any> {
    log.debug(JSON.stringify(id));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .delete(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          log.debug('process error ' + err);
          resolve(err);
        });
    });
  }

  public pauseJob(id: string): Promise<any> {
    log.debug(JSON.stringify(id));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .pause(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  public resumeJob(id: string): Promise<any> {
    log.debug(JSON.stringify(id));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .resume(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  public getJob(id: string): Promise<any> {
    log.debug(JSON.stringify(id));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .get(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  public runJob(id: string): Promise<any> {
    log.debug(JSON.stringify(id));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .run(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  public patchJob(id: string, resource: Job): Promise<any> {
    log.debug(id + ' ' + JSON.stringify(resource));
    return new Promise((resolve, reject) => {
      SecurityService.authenticate()
        .then(auth => {
          const request = {
            name:
              `projects/${env.gcp.projectId}/${env.gcp.schedulerLocation}/jobs/${id}`,
            resource,
            auth,
          };
          cloudScheduler.projects.locations.jobs
            .patch(request)
            .then((res: GaxiosResponse) => {
              log.debug(JSON.stringify(res.data));
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          resolve(err);
        });
    });
  }
}
