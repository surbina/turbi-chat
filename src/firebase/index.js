import app from 'firebase/app';
import 'firebase/database';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
  }
}

export default new Firebase();
