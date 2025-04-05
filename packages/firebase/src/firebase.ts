
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkBUZgqTSpk_K4WUPtI1HqPw_2LGKFp00",
  authDomain: "slay-8effb.firebaseapp.com",
  projectId: "slay-8effb",
  storageBucket: "slay-8effb.appspot.com",
  messagingSenderId: "968742168285",
  appId: "1:968742168285:web:c0dc3c5f987dff220c5d34",
  measurementId: "G-ZDMLFNRJ1Y",
};

// ✅ Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Set persistence (Make sure it's set **before** any sign-in happens)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Firebase persistence is enabled"))
  .catch((error) => console.error("❌ Error setting persistence:", error));

export { auth };
