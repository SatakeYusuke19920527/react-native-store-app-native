import firebase from 'firebase'

export type User = {
  id?: string;
  name: string;
  createAt: firebase.firestore.Timestamp;
  updateAt: firebase.firestore.Timestamp;
}

export const initialUser: User = {
  name: "",
  createAt: firebase.firestore.Timestamp.now(),
  updateAt: firebase.firestore.Timestamp.now()
}