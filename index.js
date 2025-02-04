const http = require('http');
//const { notifyNewOrder } = require('./src/send_notifications');
//const admin = require('firebase-admin');
const ordernotification = require('./src/features/orders/application/orders_service');


ordernotification.getOrders();

// Crear un servidor HTTP para mantener el proceso activo
const server = http.createServer((req, res) => {
    res.end('Servidor está en funcionamiento');
});

server.listen(3000, () => {
    console.log('Servidor está en funcionamiento en el puerto 3000');
});
