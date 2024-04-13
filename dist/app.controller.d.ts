import { AppService } from './app.service';
import { AddressService } from './modules/address/address.service';
import { Queue } from 'bull';
export declare class AppController {
    private readonly appService;
    private readonly addressSave;
    private emailQueue;
    constructor(appService: AppService, addressSave: AddressService, emailQueue: Queue);
    getHello(): string;
    getGeolocation(address: string, email?: string): Promise<{
        location: {
            latitude: number;
            longitude: number;
        };
    }>;
}
