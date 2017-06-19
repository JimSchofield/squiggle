import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLpMTH_0SDPMc7BIPCY-8uBkiDYWPY7y0",
  authDomain: "squiggle-f82f8.firebaseapp.com",
  databaseURL: "https://squiggle-f82f8.firebaseio.com",
  projectId: "squiggle-f82f8",
  storageBucket: "squiggle-f82f8.appspot.com",
  messagingSenderId: "1079944801919"
};

var fire = firebase.initializeApp(config);
export default fire;