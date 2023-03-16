import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBj-EtZcgvT5cWTpSudnVErRdIAECRfkXA",
    authDomain: "portfolio-eden.firebaseapp.com",
    projectId: "portfolio-eden",
    storageBucket: "portfolio-eden.appspot.com",
    messagingSenderId: "342922951138",
    appId: "1:342922951138:web:380d8433a75a91dbfc21bb"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);

export const user = ref()

const auth = getAuth()
onAuthStateChanged(auth, async () => {
    user.value = auth.currentUser
})