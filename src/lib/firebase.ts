import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { Shop } from '../types/Shop';
if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra!.firebase); 
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const getShops = async () => {
  try {
    const snapshot = await
    db
      .collection("shops")
      .orderBy("score", "desc")
      .get()
    const shops = snapshot.docs.map(doc => doc.data() as Shop)
    return shops
  } catch (error) {
    console.log(error)
  }
};