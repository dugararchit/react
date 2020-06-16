import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBBX6qqmp7n0oJ8cTCeQ0nw8xLT9TPbOJQ",
  authDomain: "testing-712d4.firebaseapp.com",
  databaseURL: "https://testing-712d4.firebaseio.com",
  projectId: "testing-712d4",
  storageBucket: "testing-712d4.appspot.com",
  messagingSenderId: "548076624249",
  appId: "1:548076624249:web:1df12d2a809fda5a6077a8"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
export default firebase;