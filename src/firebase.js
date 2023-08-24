import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_API_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_API_PROJECT_ID,
  storageBucket: "prtimes-hackathon.appspot.com",
  messagingSenderId: import.meta.env.FIREBASE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_API_APP_ID,
  measurementId: import.meta.env.FIREBASE_API_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);