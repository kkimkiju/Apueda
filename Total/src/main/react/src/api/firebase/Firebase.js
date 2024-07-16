import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZroQfm6By_Mq-cuo0JvlKA-wv3gn0sUc",
  authDomain: "apeuda-f3ba7.firebaseapp.com",
  projectId: "apeuda-f3ba7",
  storageBucket: "apeuda-f3ba7.appspot.com",
  messagingSenderId: "705629961139",
  appId: "1:705629961139:web:e18b5b92b0224fb122e9c6",
  measurementId: "G-128HR1PFK5",
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
