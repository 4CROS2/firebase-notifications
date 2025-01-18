const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

// Inicializar Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const firestore = getFirestore();
const messaging = getMessaging();

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

        // Crear el payload de la notificación
        const payload = {
            notification: {
                title: "Nuevo Pedido",
                body: `Tienes un nuevo pedido: ${orderData.productName}`,
            },
        };

        // Enviar la notificación
        await messaging.sendToDevice(sellerToken, payload);
        console.log(`Notificación enviada al vendedor con ID ${sellerId}`);
    } catch (error) {
        console.error("Error al procesar la notificación:", error);
    }
};

module.exports = { notifyNewOrder };
