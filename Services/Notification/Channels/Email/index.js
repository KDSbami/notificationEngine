import NotificationService from '../NotificationService';


class EmailNotification extends NotificationService {
  constructor(id,provider) {
    super();
    this.id = id;
    this.type = 'email';
    this.provider = provider;
    this.notifications = {};
  }

  async send(to,subject, variables) {
    // Logic to send email notification
    try{

        const result = await this.provider.send(to, subject, variables);
        if (!result) {
            throw new Error('Failed to send email');
        }
        this.notifications[result.id] = result;

    } catch (error) {
      console.error('Error sending email notification:', error);
      throw new Error('Failed to send email notification');
    }

    console.log(`Sending email notification: ${message}`);
    
  }

}