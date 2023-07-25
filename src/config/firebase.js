
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCjSzJyOjrh1Leu__bgdXJEWIUwbZILXOA",
    authDomain: "lucky-draw-64408.firebaseapp.com",
    databaseURL: "https://lucky-draw-64408-default-rtdb.firebaseio.com",
    projectId: "lucky-draw-64408",
    storageBucket: "lucky-draw-64408.appspot.com",
    messagingSenderId: "822476918676",
    appId: "1:822476918676:web:0db553da8509ff013dc981"
  };


const app = initializeApp(firebaseConfig);




const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }










