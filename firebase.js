import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6kNPLHVKg2p60jnSrfeqfhPkc-wNX2zk",
  authDomain: "summer-camp-4068a.firebaseapp.com",
  projectId: "summer-camp-4068a",
  storageBucket: "summer-camp-4068a.firebasestorage.app",
  messagingSenderId: "113220247002",
  appId: "1:113220247002:web:17c76d9ecf9667d1ecf4e3",
  measurementId: "G-KS89QVBRX6"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;