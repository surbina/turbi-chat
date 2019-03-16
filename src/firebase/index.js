import app from 'firebase/app';
import 'firebase/firestore';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.firestore = app.firestore();
  }

  postMessage(message) {
    // Create an empty doc with automatic id
    const messageRef = this.firestore
      .collection('channels')
      .doc('public')
      .collection('messages')
      .doc();

    // Set message data
    return messageRef
      .set({
        ...message,
        id: messageRef.id,
        timestamp: app.firestore.FieldValue.serverTimestamp(),
      });
  }
}

export default new Firebase();
