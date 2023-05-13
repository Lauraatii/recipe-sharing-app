import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { setUser } from "./redux/actions";
import store from '../src/redux/store';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM_YJHXZXqk3AJoeYV6XLiQSkemg53hbE",
  authDomain: "recipe-sharing-app-1613f.firebaseapp.com",
  projectId: "recipe-sharing-app-1613f",
  storageBucket: "recipe-sharing-app-1613f.appspot.com",
  messagingSenderId: "646721825137",
  appId: "1:646721825137:web:d0e8ef283c7f6e9de5aed0",
  measurementId: "G-RBF7ZKZE6N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// Observer to listen for changes in the user's authentication state
auth.onAuthStateChanged((user) => {
  console.log("Firebase user object:", user);

  if (user) {
    store.dispatch(setUser({ uid: user.uid, email: user.email }));
  } else {
    store.dispatch(setUser({ uid: null, email: null }));
  }
});

export { app, auth, firestore, storage };
