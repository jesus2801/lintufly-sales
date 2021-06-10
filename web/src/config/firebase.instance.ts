import app from 'firebase/app';

import 'firebase/storage';
import { firebaseConfig } from './firebase.config';

class Firebase {
  public ref: app.storage.Reference;

  constructor() {
    if (app.apps.length === 0) {
      app.initializeApp(firebaseConfig);
    }

    this.ref = app.storage().ref();
  }
}

export default new Firebase();
