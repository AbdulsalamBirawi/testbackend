import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  private readonly URL = `https://geocode.maps.co/search?api_key=${process.env.MAP_API_KEY}&limit=1`;

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    const existingAddress = await this.addressRepository.findOne({
      where: { address },
    });
    if (existingAddress) {
      return existingAddress;
    }
    try {
      const { data } = await axios.get(`${this.URL}`, {
        params: {
          q: address,
          format: 'json',
        },
      });

      if (data && data.length > 0) {
        const geo = data[0];
        await this.addressRepository.save({
          address,
          latitude: geo.lat,
          longitude: geo.lon,
        });

        return {
          latitude: geo.lat,
          longitude: geo.lon,
        };
      }
    } catch (error) {
      throw new HttpException(`Could not fetch ${address}`, 404);
    }
    return null;
  }
}
