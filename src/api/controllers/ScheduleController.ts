import { JsonController, Get, Post, Body, Delete, Param, Put, Patch } from 'routing-controllers';
import { ScheduleService } from '../services/ScheduleService';
import { Job } from '../models/Job';

@JsonController('/api')
export class ScheduleController {

    constructor(
        private scheduleService: ScheduleService
    ) { }

    @Get('/schedule/list')
    public showJobs(): any {
        return this.scheduleService.listJobs();
    }

    @Post('/schedule/add')
    public addJob(@Body() payload: Job): any {
        return this.scheduleService.createJob(payload);
    }

    @Delete('/schedule/:id')
    public removeJob(@Param('id') id: string): any {
        return this.scheduleService.deleteJob(id);
    }

    @Put('/schedule/stop/:id')
    public stopJob(@Param('id') id: string): any {
        return this.scheduleService.pauseJob(id);
    }

    @Put('/schedule/start/:id')
    public startJob(@Param('id') id: string): any {
        return this.scheduleService.resumeJob(id);
    }

    @Put('/schedule/run/:id')
    public executeJob(@Param('id') id: string): any {
        return this.scheduleService.runJob(id);
    }

    @Get('/schedule/:id')
    public getJob(@Param('id') id: string): any {
        return this.scheduleService.getJob(id);
    }

    @Patch('/schedule/:id')
    public updateJob(@Param('id') id: string, @Body() resource: Job): any {
        return this.scheduleService.patchJob(id, resource);
    }
}
