import firebase from '@firebase/app';
import "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyAaiMTXQX55PPe0J0nOG59BBSjV9DkWNW8",
    authDomain: "mybooks-e63db.firebaseapp.com",
    projectId: "mybooks-e63db",
    storageBucket: "mybooks-e63db.appspot.com",
    messagingSenderId: "389994306728",
    appId: "1:389994306728:web:0b881a906fb5e238b4369d"
  };


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};