import app from 'firebase/app';
import 'firebase/firestore';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.subscription = null;
    this.firestore = app.firestore();
  }

  getMessageCollection() {
    return this.firestore
      .collection('channels')
      .doc('public')
      .collection('messages');
  }

  postMessage(message) {
    // Create an empty doc with automatic id
    const messageRef = this.getMessageCollection().doc();

    // Set message data
    return messageRef
      .set({
        ...message,
        id: messageRef.id,
        timestamp: app.firestore.FieldValue.serverTimestamp(),
      });
  }

  subscribeToChat(callback) {
    this.subscription = this.getMessageCollection()
      .orderBy('timestamp', 'desc')
      .limit(12)
      .onSnapshot((snapshot) => {
        const docs = snapshot
          .docChanges()
          .filter(change => (change.type !== 'removed'));

        callback(docs);
      });

    return this.subscription;
  }

  unsubscribeFromChat() {
    this.subscription();
  }
}

export default new Firebase();
