import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { Shop } from '../types/Shop';
import { initialUser, User } from '../types/User';

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

export const signIn = async () => {
  const userCredential = await auth.signInAnonymously()
  const uid = userCredential.user?.uid
  const userDoc = await db.collection("users").doc(uid).get()
  if (!userDoc.exists) {
    await db.collection('users').doc(uid).set(initialUser)
    return {
      ...initialUser,
      id: uid
    } as User
  } else {
    return {
      id: uid,
      ...userDoc.data()
    } as User
  }
}

export const updateUser = async (userId: string, params: any) => {
  await db.collection('users').doc(userId).update(params)
}