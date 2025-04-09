import Notification from '../../../../Types/Notification/index.js';
import NotificationProvider from '../../../../Interfaces/NotificationProvider/index.js';
import { guidGenerator } from '../../../../utils.js';
import { EmailTemplate } from '../../Utils/templates.js';
export class SESProvider extends NotificationProvider {
  constructor(config) {
    super(config);
    this.type = 'email';
    this.config = config; // this will handle rate limits and other configurations
    this.credentials = config.credentials;
    this.templates = config.templates ?? {}; // should be extensible (HashMap) and have multiple templates
  }

  async send(channelId,templateId, to, variables = {}) {
    try {
        const template  = this.templates[templateId];
        if (!template) {
            throw new Error(`Template ${templateId} not found`);
        }
        const message = template.renderMessage(variables);
        const subject = template.renderSubject(variables);
        const id = guidGenerator();
        // api call here
        console.log(`Sending email to ${to} from ${this.credentials.from} with subject "${subject} & id ${id}"`);
        const notification  = new Notification(
            id,
            subject,
            message,
            this.type,
            new Date(),
            to,
            channelId,
            Math.random() > 0.9 ? 'success': 'failure', // ideally it will be pending and latency will be null. we will get a webhook that completes the notification chain.
            100
        );
        return Promise.resolve(notification);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

}