const INotificationRepository = require('../data/repository/notification_repository_impl');
const SendNotificationUseCase = require('../domain/usecase/notification_usecase');

const notificationRepository = new INotificationRepository();
const sendNotificationUseCase = new SendNotificationUseCase(notificationRepository);

async function sendNotification(notificationEntity){
   await sendNotificationUseCase.execute(notificationEntity);
}


module.exports = { sendNotification };