import { Job } from 'bull';
interface EmailJob {
    to: string;
    location: {
        latitude: number;
        longitude: number;
    };
}
export declare class EmailConsumer {
    sendEmail(job: Job<EmailJob>): Promise<void>;
}
export {};
