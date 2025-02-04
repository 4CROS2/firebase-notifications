const admin = require('firebase-admin');


const serverStartTime = new Date();
serverStartTime.setSeconds(0);
serverStartTime.setMilliseconds(0); 

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const serverStartTimestamp = admin.firestore.Timestamp.fromDate(serverStartTime);
module.exports = {serverStartTimestamp, admin };