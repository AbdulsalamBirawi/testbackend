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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const bull_2 = require("bull");
const nodemailer = require("nodemailer");
let EmailConsumer = class EmailConsumer {
    async sendEmail(job) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'salambirawi99@gmail.com',
                pass: 'osov zpzp kbsi mptc',
            },
        });
        await transporter
            .sendMail({
            from: 'salambirawi99@gmail.com',
            to: job.data.to,
            subject: 'GeoLocation',
            text: `Geo Location for your requested address is ${job.data.location.latitude} ,${job.data.location.longitude}`,
        })
            .catch(console.log);
        console.log('email sent ');
    }
};
exports.EmailConsumer = EmailConsumer;
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], EmailConsumer.prototype, "sendEmail", null);
exports.EmailConsumer = EmailConsumer = __decorate([
    (0, bull_1.Processor)('emails')
], EmailConsumer);
//# sourceMappingURL=emails.consumer.js.map