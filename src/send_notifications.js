const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

// Inicializar Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const firestore = getFirestore();
const messaging = getMessaging();

// Registrar la hora de inicio del servidor
const serverStartTime = new Date(); // Al iniciar el servidor, guardamos la hora actual
serverStartTime.setSeconds(0); // Ajustamos a la hora exacta sin segundos ni milisegundos
serverStartTime.setMilliseconds(0);

// Convertir a Timestamp de Firebase
const serverStartTimestamp = admin.firestore.Timestamp.fromDate(serverStartTime);

const notifyNewOrder = async (sellerId, orderData) => {
    try {
        // Obtener los datos del vendedor desde Firestore
        const sellerDoc = await firestore.collection("sellers").doc(sellerId).get();

        if (!sellerDoc.exists) {
            console.error(`El documento del vendedor con ID ${sellerId} no existe.`);
            return;
        }

        const sellerData = sellerDoc.data();
        const sellerToken = sellerData.fcmToken;

        if (!sellerToken) {
            console.error(
                `El vendedor con ID ${sellerId} no tiene un token de notificación.`
            );
            return;
        }

        // Verificar si el campo created_at existe y es de tipo Timestamp
        if (!orderData.created_at || !(orderData.created_at instanceof admin.firestore.Timestamp)) {
            console.log("El campo 'created_at' no está presente o no es un Timestamp válido.");
            return;
        }

        // Obtener el timestamp 'created_at' del pedido
        const orderTimestamp = orderData.created_at;

        // Verificar si el pedido fue creado después de la hora de inicio del servidor
        if (orderTimestamp.toDate() >= serverStartTimestamp.toDate()) {
            // Crear el payload de la notificación
            const payload = {
                notification: {
                    title: "Nuevo Pedido",
                    body: `Tienes un nuevo pedido: ${orderData.productName}`,
                },
                token: sellerToken,
            };

            // Enviar la notificación
            await messaging.send(payload);
            console.log(`Notificación enviada al vendedor con ID ${sellerId}`);
        } else {
            console.log(`El pedido fue creado antes de que se iniciara el servidor, no se envió la notificación.`);
        }
    } catch (error) {
        console.error("Error al procesar la notificación:", error);
    }
};

module.exports = { notifyNewOrder };
