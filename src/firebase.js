import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { setAuth } from "./redux/actions";
import store from '../src/redux/store';
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM_YJHXZXqk3AJoeYV6XLiQSkemg53hbE",
  authDomain: "recipe-sharing-app-1613f.firebaseapp.com",
  projectId: "recipe-sharing-app-1613f",
  storageBucket: "recipe-sharing-app-1613f.appspot.com",
  messagingSenderId: "646721825137",
  appId: "1:646721825137:web:d0e8ef283c7f6e9de5aed0",
  measurementId: "G-RBF7ZKZE6N"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


// observer to listen for changes in the user's authentication state and update the auth property in the 
// Redux store using the setAuth action
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(setAuth(user.uid));
  } else {
    store.dispatch(setAuth(null));
  }
});


export { app, auth, database, firestore, storage };
