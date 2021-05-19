import * as functions from "firebase-functions";

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

import { User } from './types/User'
import { Review } from './types/Review'
import { Shop } from './types/Shop'

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


exports.onWriteReview = functions
  .region('asia-northeast2')
  .firestore.document("shops/{shopId}/reviews/{reviewId}")
  .onWrite(async (change, context) => {
    const { shopId } = context.params;
    const review = change.after.data() as Review;
    try {
      const shopRef = db.collection("shops").doc(shopId)
      const shopDoc = await shopRef.get()
      const shop = shopDoc.data() as Shop
      // 平均scoreの計算
      let { score1 = 0, score2 = 0, score3 = 0, score4 = 0, score5 = 0 } = shop;
      if (review.score === 1) {
        score1 += 1;
      } else if (review.score === 2) {
        score2 += 1;
      } else if (review.score === 3) {
        score3 += 1;
      } else if (review.score === 4) {
        score4 += 1;
      } else if (review.score === 5) {
        score5 += 1;
      }
      let aveScore =
        (score1 + score2 * 2 + score3 * 3 + score4 * 4 + score5 * 5) /
        (score1 + score2 + score3 + score4 + score5);
      aveScore = Math.round(aveScore * 100) / 100;

      // shopの更新
      let params = {};
      if (review.score === 1) {
        params = {
          score1: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 2) {
        params = {
          score2: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 3) {
        params = {
          score3: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 3) {
        params = {
          score3: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 4) {
        params = {
          score4: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 5) {
        params = {
          score5: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      }
      await shopRef.update(params);

    } catch (error) {
      console.log(error)
    }
  })