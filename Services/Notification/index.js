import { EmailService } from './Channels/Email/index.js';
import { SESProvider } from './Channels/Email/Providers/SES/index.js';
import { NotificationRepository } from './Repositories/Notification/index.js';
import { EmailTemplate } from './Channels/Email/Utils/templates.js';

export const Providers = {
    SES: SESProvider
};
export const Channels = {
    Email: EmailService
};

export const Repositories = {
    NotificationRepository
};

export const Utils = {
    EmailTemplate
};