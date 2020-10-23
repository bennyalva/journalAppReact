import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB-cxnwy2sUwfUi7eqyUl8EVdf_N37oZ5s",
    authDomain: "react-app-journal-1a0ee.firebaseapp.com",
    databaseURL: "https://react-app-journal-1a0ee.firebaseio.com",
    projectId: "react-app-journal-1a0ee",
    storageBucket: "react-app-journal-1a0ee.appspot.com",
    messagingSenderId: "36341576691",
    appId: "1:36341576691:web:b689963076a2466d071886"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }