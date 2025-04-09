export class NotificationRepository {
    constructor() {
        this.notifications = new Map(); // Using a Map for better performance with key-value pairs
    }

    // Create or Update a notification
    save(notification) {
        // this is a composite key of channelId and id. Handles querying the correct provider's notification. When we have an actual database it will only be id for simplicity
        this.notifications.set(notification.channelId+'_'+notification.id, notification);
    }

    // Read a notification by ID
    findById(id, channelId) {
        return this.notifications.get(channelId + '_' + id) || null;
    }

    // Delete a notification by ID
    deleteById(id, channelId) {
        return this.notifications.delete(channelId + '_' + id);
    }

    // Get all notifications
    findAll() {
        return Array.from(this.notifications.values());
    }

    // Get all notifications by status for a given channelId
    findAllByStatus(status, channelId) {
        return Array.from(this.notifications.values())
            .filter(notification => notification.status === status && notification.channelId === channelId);
    }

    // Get all notifications by status. provider agnostic
    findAllByStatus(status) {
        return Array.from(this.notifications.values())
            .filter(notification => notification.status === status);
    }
}