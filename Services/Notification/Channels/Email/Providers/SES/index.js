class SESProvider extends EmailProvider {
  constructor(config) {
    super(config);
    this.config = config; // this will handle rate limits and other configurations
    this.credentials = config.credentials;
    this.templates = config.template; // should be extensible (HashMap) and have multiple templates
  }

  async send(templateId, to, subject, variables) {
    try {
        const template  = this.templates[templateId];
        if (!template) {
            throw new Error(`Template ${templateId} not found`);
        }
        const message = template.render(variables);
        // api call here
        console.log(`Sending email to ${to} from ${this.credentials.from} with subject "${subject}"`);
        const notification  = new Notification(
            this.id,
            subject,
            message,
            this.type,
            new Date(),
            to,
            this.id,
            Math.random() > 0.5 ? 'success': 'failure', // ideally it will be pending and latency will be null. we will get a webhook that completes the notification chain.
            100
        );
        console.log(`Notification created:`, notification);
        return notification;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

}