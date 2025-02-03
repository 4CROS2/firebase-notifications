const NotificationRepository = require('../repository/order_repository');

class ListenNewOrdersUseCase {
    /**
     * @param {NotificationRepository} notificationRepository - Repositorio que cumple la interfaz definida.
     */
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Ejecuta el caso de uso.
     * @param {Function} callback - Función que se invoca cada vez que llega una nueva notificación.
     *                              Recibe una instancia de NotificationEntity.
     */
    execute(callback) {
        
        this.notificationRepository.listenForNewOrders((notificationEntity) => {
            // Aquí podrías aplicar lógica adicional o transformación si fuera necesario.
            callback(notificationEntity);
        });
    }
}

module.exports = ListenNewOrdersUseCase;
