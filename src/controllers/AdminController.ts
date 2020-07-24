import { Request, Response } from 'express';
import { Get, Controller, Res, Req } from 'routing-controllers';
import { env } from '../env';
import { AdminService } from '../api/services/AdminService';

@Controller('/admin')
export class AdminController {

  constructor(
    private adminService: AdminService
  ) { }

  @Get('/locations')
  public getLocations(): any {
    return this.adminService.listLocations();
  }

  @Get()
  public getAll(@Req() request: Request, @Res() response: Response): Response {
    return response.send({
      name: env.app.name,
      version: env.app.version,
      description: env.app.description,
    });
  }

}
