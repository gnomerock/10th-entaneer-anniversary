import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
  apiKey: "AIzaSyALcy-dJ-mQNyvy9cy-SQba0sbKxErvIsw",
  authDomain: "thyeargear42.firebaseapp.com",
  projectId: "thyeargear42",
  storageBucket: "thyeargear42.appspot.com",
  messagingSenderId: "818161636537",
  appId: "1:818161636537:web:fcacebbab5115198337768"
};
firebase.initializeApp(firebaseConfig);
// Get a Firestore instance
export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const fb = firebase;
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
