// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCfUxjlAbkXAK33g0FHdI582jSDAI7JAKA',
    authDomain: 'onlinelearning-swp.firebaseapp.com',
    projectId: 'onlinelearning-swp',
    storageBucket: 'onlinelearning-swp.appspot.com',
    messagingSenderId: '240378417564',
    appId: '1:240378417564:web:ae1842c4d85ffd86487859',
    measurementId: 'G-8L6VEF69BC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
