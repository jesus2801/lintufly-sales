import type { Bucket } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

import config from '.';

class FirebaseInstance {
  private app: admin.app.App;
  public bucket: Bucket;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(readFileSync(path.join(__dirname, '../../firebase.key.json'), 'utf8')),
      ),
      projectId: config.firebase.projectId,
      storageBucket: config.firebase.storageBucket,
    });

    this.bucket = this.app.storage().bucket();
  }
}

export const firebaseInstance = new FirebaseInstance();
