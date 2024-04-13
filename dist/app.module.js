"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const address_service_1 = require("./modules/address/address.service");
const address_entity_1 = require("./modules/address/address.entity");
const bull_1 = require("@nestjs/bull");
const emails_consumer_1 = require("./modules/workers/emails.consumer");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: (() => {
                    console.log(process.env);
                    return process.env.DB_HOST;
                })(),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                port: +process.env.DB_PORT,
                database: process.env.DB_NAME,
                entities: [address_entity_1.Address],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([address_entity_1.Address]),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_HOST,
                    port: +process.env.REDIS_PORT,
                },
            }),
            bull_1.BullModule.registerQueue({
                name: 'emails',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, address_service_1.AddressService, emails_consumer_1.EmailConsumer],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map