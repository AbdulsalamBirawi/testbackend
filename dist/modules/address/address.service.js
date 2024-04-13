"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./address.entity");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
        this.URL = `https://geocode.maps.co/search?api_key=${process.env.MAP_API_KEY}&limit=1`;
    }
    async geocode(address) {
        const existingAddress = await this.addressRepository.findOne({
            where: { address },
        });
        if (existingAddress) {
            return existingAddress;
        }
        try {
            const { data } = await axios_1.default.get(`${this.URL}`, {
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
        }
        catch (error) {
            throw new common_1.HttpException(`Could not fetch ${address}`, 404);
        }
        return null;
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AddressService);
//# sourceMappingURL=address.service.js.map