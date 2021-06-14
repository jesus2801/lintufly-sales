import app from 'firebase/app';

import 'firebase/storage';
import { firebaseConfig } from './firebase.config';

class Firebase {
  public storage: app.storage.Storage;

  constructor() {
    if (app.apps.length === 0) app.initializeApp(firebaseConfig);

    this.storage = app.storage();
  }
}

export default new Firebase();
