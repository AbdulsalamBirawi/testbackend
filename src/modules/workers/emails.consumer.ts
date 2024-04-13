import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

interface EmailJob {
  to: string;
  location: { latitude: number; longitude: number };
}

@Processor('emails')
export class EmailConsumer {
  @Process()
  async sendEmail(job: Job<EmailJob>) {
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
}
