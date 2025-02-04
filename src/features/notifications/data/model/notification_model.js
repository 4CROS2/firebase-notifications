const NotificationEntity = require("../../domain/entity/notification_entity");

class NotificationModel extends NotificationEntity {
    constructor({
        id,
        token,
        title = "",
        body = "",
        image = "",
        route = "",
        data = {},
    }) {
        super({ id, token, title, body, image, route, data });
    }

    /**
     * Crea una instancia de NotificationModel a partir de una NotificationEntity.
     * @param {NotificationEntity} entity 
     * @returns {NotificationModel}
     */
    static fromEntity(entity) {
        return new NotificationModel({
            id: entity.id,
            token: entity.token,
            title: entity.title,
            body: entity.body,
            image: entity.image,
            route: entity.route,
            data: entity.data,
        });
    }

    /**
     * @param {Object} json 
     * @returns {NotificationModel}
     */
    static fromJson(json) {
        return new NotificationModel(json);
    }
}

module.exports = NotificationModel;
