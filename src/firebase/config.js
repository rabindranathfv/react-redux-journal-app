import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ORmGCDmCW1DfBAgY4u4rgRtZqgN8h84",
  authDomain: "journalapp-react-d1209.firebaseapp.com",
  projectId: "journalapp-react-d1209",
  storageBucket: "journalapp-react-d1209.appspot.com",
  messagingSenderId: "344291098110",
  appId: "1:344291098110:web:cca386d28b83ed94c594af"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseCloudStore = getFirestore(FirebaseApp);