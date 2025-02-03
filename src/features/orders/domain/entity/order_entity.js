class NotificationEntity {
    constructor({
        quantity,
        total_paid,
        product_name,
        created_at,
        description,
        seller_id,
        buyer_id,
        sell_price,
        order_id,
        product_id,
        image,
    }) {
        this.quantity = quantity;
        this.total_paid = total_paid;
        this.product_name = product_name;
        this.created_at = created_at;
        this.description = description;
        this.seller_id = seller_id;
        this.buyer_id = buyer_id;
        this.sell_price = sell_price;
        this.order_id = order_id;
        this.product_id = product_id;
        this.image = image;

        Object.freeze(this); // Hace la entidad inmutable
    }

    
}

module.exports = NotificationEntity;
