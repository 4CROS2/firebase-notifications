const NotificationEntity = require('../../domain/entity/order_entity');

class NotificationModel extends NotificationEntity {
    static fromJson(json) {
        return new NotificationModel(json);
    }

    static fromEntity(entity) {
        return new NotificationModel(entity);
    }

    toJSON() {
        return {
            quantity: this.quantity,
            total_paid: this.total_paid,
            product_name: this.product_name,
            created_at: this.created_at,
            description: this.description,
            seller_id: this.seller_id,
            buyer_id: this.buyer_id,
            sell_price: this.sell_price,
            order_id: this.order_id,
            product_id: this.product_id,
            image: this.image,
        };
    }
}

module.exports = NotificationModel;
