import { Repository } from 'typeorm';
import { Address } from './address.entity';
export declare class AddressService {
    private readonly addressRepository;
    private readonly URL;
    constructor(addressRepository: Repository<Address>);
    geocode(address: string): Promise<{
        latitude: number;
        longitude: number;
    } | null>;
}
