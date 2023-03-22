// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYZcFFg0-ufuvX0QOIkU0mU3S-t1MfVLQ',
  authDomain: 'netflix-92bbf.firebaseapp.com',
  projectId: 'netflix-92bbf',
  storageBucket: 'netflix-92bbf.appspot.com',
  messagingSenderId: '548513608853',
  appId: '1:548513608853:web:6720c663a9c39ac89fd79c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
