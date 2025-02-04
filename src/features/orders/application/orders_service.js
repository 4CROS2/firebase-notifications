const { admin, serverStartTimestamp } = require('../../../core/configs/server/server_time');

const { getFirestore } = require("firebase-admin/firestore");
const OrderRepositoryImpl = require("../data/repository/order_repository_impl");
const ListenNewOrdersUseCase = require('../domain/usecase/order_usecase');
const NotificationEntity = require('../../notifications/domain/entity/notification_entity');
const { sendNotification } = require('../../notifications/application/notification');
const firestore = getFirestore();



// Inyecta la implementación concreta en el caso de uso, pero el UseCase solo conoce la abstracción.
const notificationRepository = new OrderRepositoryImpl();
const listenNewOrdersUseCase = new ListenNewOrdersUseCase(notificationRepository);

function getOrders() {
  listenNewOrdersUseCase.execute(async (orderEntity) => {

    const sellerDoc = await firestore.collection("sellers").doc(orderEntity.seller_id).get();
    if (!sellerDoc.exists) {
      console.error(`El documento del vendedor con ID ${orderEntity.seller_id} no existe.`);
      return;
    }

    const sellerToken = sellerDoc.data().fcmToken;

    if (!sellerToken) {
      console.error(
        `El vendedor con ID ${orderEntity.seller_id} no tiene un token de notificación.`
      );
      return;
    }

    if (!orderEntity.created_at || !(orderEntity.created_at instanceof admin.firestore.Timestamp)) {
      console.log("El campo 'created_at' no está presente o no es un Timestamp válido.");
      return;
    }

    const orderTimestamp = orderEntity.created_at;

    if (orderTimestamp.toDate() >= serverStartTimestamp.toDate()) {
      const data = new NotificationEntity({
        id: orderEntity.seller_id,
        title: "Nueva orden",
        body: `Tienes una nueva orden de ${orderEntity.product_name}.`,
        route: `/order/${orderEntity.order_id}`,
        token: sellerToken,
        image: orderEntity.image,
      })

      await sendNotification(data);
    }

  });

}


module.exports = { getOrders };