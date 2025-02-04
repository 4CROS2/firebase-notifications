const admin = require('../../../../core/configs/firebase/firebase-config');
const firestore = admin.firestore();

const listenForNewOrders = (callback) => {
    try {
        firestore.collectionGroup('orders').onSnapshot(async (snapshot) => {
            const changes = snapshot.docChanges();

            for (const change of changes) {
                if (change.type === 'added') {
                    try {
                        const orderData = change.doc.data();
                        const sellerId = change.doc.ref.parent.parent.id;
                        orderData.seller_id = sellerId;

                        callback(orderData);
                    } catch (error) {
                        console.error(`Error al procesar la orden: ${error.message}`);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al escuchar nuevos pedidos:', error);
    }
};

module.exports = { listenForNewOrders };
