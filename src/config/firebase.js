
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDMXplb5cfUS0TculHOz_MCH8XKPYF1ccI",
    authDomain: "luckydraw-is.firebaseapp.com",
    projectId: "luckydraw-is",
    storageBucket: "luckydraw-is.appspot.com",
    messagingSenderId: "912358762809",
    appId: "1:912358762809:web:221093016f47e98ae720e8"
};


const app = initializeApp(firebaseConfig);




const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }










