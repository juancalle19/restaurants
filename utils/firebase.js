import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA5iqHpOhQ6H4mDMrJp7WZpX_PaLqUwgao",
    authDomain: "restaurants-2ec62.firebaseapp.com",
    projectId: "restaurants-2ec62",
    storageBucket: "restaurants-2ec62.appspot.com",
    messagingSenderId: "494140905913",
    appId: "1:494140905913:web:4b84288a3045f910aafe68"
  }

  // Initialize Firebase
 export const firebaseApp = firebase.initializeApp(firebaseConfig)