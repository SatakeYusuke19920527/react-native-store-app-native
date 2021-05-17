import * as functions from "firebase-functions";

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

import { User } from './types/User'
exports.onUpdateUser = functions
  .region('asia-northeast2')
    .firestore
    .document('users/{userId}')
    .onUpdate(async (change, context) => {
      const { userId } = context.params
      const newUser = change.after.data() as User
      try {
        const snapshot = await db.collectionGroup('reviews').where('user.id', '==', userId).get()
        const batch = db.batch()
        snapshot.docs.forEach((reviewDoc: any) => {
          const user = { ...reviewDoc.data().user, name: newUser.name }
          batch.update(reviewDoc.ref, {user})
        });
        await batch.commit()
      } catch (error) {
        console.log(error)
      }
    });
