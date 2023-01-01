const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require(__dirname + '/keys/e-hunterapp-firebase-adminsdk-fzk1j-2314178e5c.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });


}

initFirebase();


function sendPushToDevice(notification) {
    const tokens = [notification.tokenId];
    const payload = {
        notification: {
            title: notification.titulo,
            body: notification.mensaje,
            sound: 'default',
            badge: '1',
        },
    };


    sendToDevice(tokens, payload);
}

module.exports = { sendPushToDevice }


//sendToDevice kill app notification
function sendToDevice(tokens, payload) {
    admin.messaging().sendToDevice(tokens, payload);
}


