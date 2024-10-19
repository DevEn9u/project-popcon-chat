import { initializeApp } from "firebase/app";
// Realtime Database import
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId,
  databaseURL: "https://project-popcon-chat-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// App을 초기화하고 Realtime을 사용할 준비를 한다.
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);

export { realtime };