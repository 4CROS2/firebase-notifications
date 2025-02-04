const { getMessaging } = require("firebase-admin/messaging");
const messaging = getMessaging();


const sendNotification = async (NotificationModel) => {
    try {

        const payload = {
            notification: {
                title: NotificationModel.title,
                body: NotificationModel.body,
                image: NotificationModel.image,
            },
            data: {
                click_action: "FLUTTER_NOTIFICATION_CLICK",
                route: NotificationModel.route,
                
            },
            token: NotificationModel.token,

        };

        // Enviar la notificación
        await messaging.send(payload);
        console.log(`Notificación enviada al usuario con ID ${NotificationModel.id}`);
    }
    catch (error) {
        console.error("Error al procesar la notificación:", error);
    }

}
module.exports = { sendNotification };
