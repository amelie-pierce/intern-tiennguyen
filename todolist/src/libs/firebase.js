import { initializeApp } from "firebase/app";
//khởi tạo Firebase 
import { getFirestore } from "firebase/firestore";
// Thiết lập và truy cập CSDL FireStore

const firebaseConfig = {
    apiKey: "AIzaSyB_EIvTCojzmRC4yo2GkEa0KAAgq4AB4Gk",
    authDomain: "tasklist-6277d.firebaseapp.com",
    projectId: "tasklist-6277d",
    storageBucket: "tasklist-6277d.firebasestorage.app",
    messagingSenderId: "131939138330",
    appId: "1:131939138330:web:fdb3a951c69b909b4b4aa3",
    measurementId: "G-2ZLT1KJGZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
