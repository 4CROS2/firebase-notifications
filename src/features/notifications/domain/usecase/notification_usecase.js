class NotificationUseCase {
    /**
     * @param {NotificationRepository} notificationRepository - Una implementación concreta
     * que cumple con la abstracción del repositorio.
     */
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Ejecuta el caso de uso.
     *
     * @param {NotificationEntity} notificationEntity
     * @returns {Promise<void>}
     */
    async execute(notificationEntity) {
        // Aquí podrías agregar validaciones o lógica de negocio adicional si lo requieres.
        await this.notificationRepository.sendNotification(notificationEntity);
    }
}

module.exports = NotificationUseCase;
