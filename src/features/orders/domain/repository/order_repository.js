class NotificationRepository {
    constructor() {
        if (new.target === NotificationRepository) {
            throw new TypeError("No se puede instanciar una clase abstracta.");
        }
    }

    /**
     * Inicia la escucha de nuevas órdenes.
     * @param {Function} callback - Función que se invoca cada vez que llega una nueva orden.
     *                              Debe recibir como parámetro una NotificationEntity.
     */
    listenForNewOrders(callback) {
        throw new Error("Method not implemented: listenForNewOrders");
    }
}

module.exports = NotificationRepository;
