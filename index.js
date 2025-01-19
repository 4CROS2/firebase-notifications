const http = require('http');
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
        console.log("Notificación enviada para el vendedor:", sellerId);
    }
);

// Crear servidor HTTP para mantener el proceso activo
const server = http.createServer((req, res) => {
    res.end('Servidor está en funcionamiento');
});

server.listen(3000, () => {
    console.log('Servidor está en funcionamiento en el puerto 3000');
});
