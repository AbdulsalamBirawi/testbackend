import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AddressService } from './modules/address/address.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly addressSave: AddressService,
    @InjectQueue('emails') private emailQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/geolocation')
  async getGeolocation(
    @Query('address') address: string,
    @Query('email') email?: string,
  ) {
    const location = await this.addressSave.geocode(address);
    if (email) this.emailQueue.add({ to: email, location });
    return { location };
  }
}
