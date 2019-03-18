import app from 'firebase/app';
import 'firebase/firestore';
import isNumber from 'lodash/isNumber';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.chatSubscription = null;
    this.activeUsersSubscription = null;
    this.userActiveTimerId = null;
    this.firestore = app.firestore();
  }

  getMessageCollection() {
    return this.firestore
      .collection('channels')
      .doc('public')
      .collection('messages');
  }

  getActiveUsersCollection() {
    return this.firestore
      .collection('channels')
      .doc('public')
      .collection('activeUsers');
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
    this.chatSubscription = this.getMessageCollection()
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot((snapshot) => {
        const docs = snapshot
          .docChanges()
          .filter(change => (change.type !== 'removed'))
          .reverse();

        callback(docs);
      });

    return this.chatSubscription;
  }

  unsubscribeFromChat() {
    this.chatSubscription();
  }

  setUserActive(user) {
    if (isNumber(this.userActiveTimerId)) {
      // if there was already a timer, then we need to reset it and start a new one
      clearTimeout(this.userActiveTimerId);
    }

    if (this.userActiveTimerId === null) {
      // if there was no timer, it means the user was inactive before this
      this.getActiveUsersCollection()
        .doc(`${user.name}${user.timestamp}`)
        .set(user);
    }

    // We will set the user inactive again after some time
    this.userActiveTimerId = setTimeout(() => {
      this.setUserInactive(user);
    }, 900);
  }

  setUserInactive(user) {
    if (isNumber(this.userActiveTimerId)) {
      clearTimeout(this.userActiveTimerId);
      this.userActiveTimerId = null;
    }

    this.getActiveUsersCollection()
      .doc(`${user.name}${user.timestamp}`)
      .delete();
  }

  subscribeToActiveUsers(callback) {
    this.activeUsersSubscription = this.getActiveUsersCollection()
      .limit(10)
      .onSnapshot((snapshot) => {
        const docs = snapshot.docChanges();

        callback(docs);
      });
  }

  unsubscribeFromActiveUsers() {
    this.activeUsersSubscription();
  }
}

export default new Firebase();
