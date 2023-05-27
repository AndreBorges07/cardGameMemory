// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    // Esse daqui já é o meu firebase 

    apiKey: "AIzaSyCMnsMzTK3nYaTBa44ueWslEO6-eQl-WTg",
    authDomain: "cardgame-memory.firebaseapp.com",
    projectId: "cardgame-memory",
    storageBucket: "cardgame-memory.appspot.com",
    messagingSenderId: "464576230147",
    appId: "1:464576230147:web:034ed8df671b7296532f36",
    measurementId: "G-E203DCQCKL"

    // ------------- Esse é o do professor ---------
    // apiKey: "AIzaSyDgokD3Gai2dWlUtgJVA3_IKSL8PTeUCyU",
    // authDomain: "flashcards-80065.firebaseapp.com",
    // projectId: "flashcards-80065",
    // storageBucket: "flashcards-80065.appspot.com",
    // messagingSenderId: "17748136109",
    // appId: "1:17748136109:web:816dffd98cfed059b6f624"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;