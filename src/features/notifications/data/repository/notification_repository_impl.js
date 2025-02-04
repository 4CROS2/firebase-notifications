// src/features/notifications/data/repository/INotificationRepository.js
const NotificationRepository = require('../../domain/repository/notification_repository');
const { sendNotification } = require('../datasource/send_notification_datasource');
const NotificationModel = require('../model/notification_model');

class INotificationRepository extends NotificationRepository {
    constructor() {
        super();
    }

    /**
     * Implementa el método sendNotification utilizando Firebase Messaging.
     * @param {NotificationEntity} notificationEntity - Instancia de NotificationEntity.
     * @returns {Promise<void>}
     */
    async sendNotification(notificationEntity) {
        // Convierte la entidad a un modelo
        const notificationModel = NotificationModel.fromEntity(notificationEntity);
        // Delegamos el envío a la función que utiliza Firebase Messaging
        await sendNotification(notificationModel);
    }
}

module.exports = INotificationRepository;
