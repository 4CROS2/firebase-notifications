const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { notifyNewOrder } = require("./src/send_notifications");

// Función para notificar al vendedor cuando se crea un nuevo pedido
exports.notifyNewOrder = onDocumentCreated(
    "sellers/{sellerId}/orders/{orderId}",
    async (event) => {
        const snapshot = event.data;
        const sellerId = event.params.sellerId;

        if (!snapshot.exists) {
            console.error("Datos del pedido están vacíos.");
            return;
        }

        const orderData = snapshot.data();

        // Llamar a la función para enviar la notificación
        await notifyNewOrder(sellerId, orderData);
    }
);
