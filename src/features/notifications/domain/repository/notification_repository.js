class NotificationRepository {
    constructor() {
        if (new.target === NotificationRepository) {
            throw new TypeError("No se puede instanciar una clase abstracta.");
        }
    }
    async sendNotification(NotificationEntity) {
        throw new Error('Method not implemented');
    }
}

module.exports = NotificationRepository;