import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAYw1uvN04N8D4swT8iQM0Ugo6wvAqV94o",
  authDomain: "crm-vue-63b53.firebaseapp.com",
  projectId: "crm-vue-63b53",
  storageBucket: "crm-vue-63b53.appspot.com",
  messagingSenderId: "114537269626",
  appId: "1:114537269626:web:a0cd9497ced989d7e6eec3"
}

export const authFirebase = getAuth(initializeApp(firebaseConfig));

let checkUser;

export default checkUser;

export const logout =  signOut(authFirebase)
