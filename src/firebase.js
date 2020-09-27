import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDB3taGDXB7mfSblZ13WbfTJ2uYIEqVkoA",
  authDomain: "leo-chat-app-67abd.firebaseapp.com",
  databaseURL: "https://leo-chat-app-67abd.firebaseio.com",
  projectId: "leo-chat-app-67abd",
  storageBucket: "leo-chat-app-67abd.appspot.com",
  messagingSenderId: "907370938458",
  appId: "1:907370938458:web:c5bba59b3660aa47115863",
  measurementId: "G-CT29EGZX4G",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
