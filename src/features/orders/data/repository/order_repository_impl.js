// src/features/notifications/data/repository/notification_repository_impl.js
const NotificationRepository = require('../../domain/repository/order_repository');
const { listenForNewOrders } = require('../datasource/orders_datasource');
const NotificationModel = require('../model/order_model');

class NotificationRepositoryImpl extends NotificationRepository {
    constructor() {
        super();
    }

    listenForNewOrders(callback) {
        listenForNewOrders((orderData) => {
            const notificationEntity = NotificationModel.fromJson(orderData);
            callback(notificationEntity);
        });
    }
}

module.exports = NotificationRepositoryImpl;
