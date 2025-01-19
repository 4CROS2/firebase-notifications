const http = require('http');
const { notifyNewOrder } = require('./src/send_notifications');
const admin = require('./firebase-config'); // Asegúrate de usar tu archivo de configuración

const firestore = admin.firestore();

const listenForNewOrders = async () => {
    try {
        // Escucha cambios en la colección de órdenes de los vendedores
        firestore.collectionGroup('orders').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                if (change.type === 'added') {
                    const orderData = change.doc.data();
                    const sellerId = change.doc.ref.parent.parent.id; // Obtén el ID del vendedor desde la referencia

                    // Llama a la función para enviar la notificación
                    await notifyNewOrder(sellerId, orderData);
                    console.log(`Notificación enviada para el vendedor: ${sellerId}`);
                }
            });
        });
    } catch (error) {
        console.error('Error al escuchar nuevos pedidos:', error);
    }
};

// Inicializa la escucha de nuevos pedidos
listenForNewOrders();

// Crear un servidor HTTP para mantener el proceso activo
const server = http.createServer((req, res) => {
    res.end('Servidor está en funcionamiento');
});

server.listen(3000, () => {
    console.log('Servidor está en funcionamiento en el puerto 3000');
});
