import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJT6MZELFtlspC3cyMGZUwDd0PY8AyreQ",
  authDomain: "catch-of-the-day-bcf4f.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-bcf4f.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;
