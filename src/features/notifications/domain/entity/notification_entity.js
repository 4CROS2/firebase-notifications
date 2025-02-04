class NotificationEntity {
    constructor({
        id,
        token,
        title = "",
        body = "",
        image = "",
        route = "",
        data = {},
    }) {
        this.id = id;
        this.token = token;
        this.title = title;
        this.body = body;
        this.image = image;
        this.route = route;
        this.data = data;
    }
}

module.exports = NotificationEntity;