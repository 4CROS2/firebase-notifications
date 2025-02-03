// src/features/notifications/application/notification_service.js
const NotificationRepositoryImpl = require("../data/repository/order_repository_impl");
const ListenNewOrdersUseCase = require('../domain/usecase/order_usecase');

// Inyecta la implementación concreta en el caso de uso, pero el UseCase solo conoce la abstracción.
const notificationRepository = new NotificationRepositoryImpl();
const listenNewOrdersUseCase = new ListenNewOrdersUseCase(notificationRepository);

// Ejecuta el caso de uso para escuchar nuevas órdenes.
listenNewOrdersUseCase.execute((notificationEntity) => {
  console.log('Nueva notificación recibida:', notificationEntity);
  
});

module.exports = { listenNewOrdersUseCase };