import NotificationService from '../../Interfaces/NotificationService/index.js';

export class EmailService extends NotificationService {
  constructor(id,provider, notificationRepository) {
    if(provider === undefined || provider === null || provider.config?.type !== 'email') { 
      throw new Error('Provider is incorrect.');
    }
    super();
    this.id = id;
    this.type = 'email';
    this.provider = provider;
    this.notifications = notificationRepository; // this behaves like a database that will be passed from outside. It is channel and provider agnostic
  }

    async send(templateId, to, variables) {
    // Logic to send email notification
    try{

        const result = await this.provider.send(this.id, templateId, to, variables);
        if (!result) {
            throw new Error('Failed to send email');
        }
        this.notifications.save(result);
        console.log(`Email sent successfully to ${to} with template ${templateId}`);
        return Promise.resolve(result);

    } catch (error) {
      console.error('Error sending email notification:', error);
      throw new Error('Failed to send email notification');
    }
    
  }

  getNotification(id) {
    const notification = this.notifications.findById(id, this.id);
    return notification;
  }

  getAllNotifications() {
    const allNotifications = this.notifications.findAll();
    return allNotifications;
  }

  getAllNotificationsByStatus(status) {
    const notificationsByStatus = this.notifications.findAllByStatus(status);
    return notificationsByStatus;
  }

  deleteNotification(id) {
    const result = this.notifications.deleteById(id, this.id);
    if (!result) {
      throw new Error('Failed to delete notification');
    }
    return result;
  }

}