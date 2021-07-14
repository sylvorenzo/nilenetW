import firebase from 'firebase';
 
// Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDK_Bhc2ZFcn4eFIvyGVqmy1xFPjQlQBdA",
   authDomain: "nilenet-c9b39.firebaseapp.com",
   projectId: "nilenet-c9b39",
   storageBucket: "nilenet-c9b39.appspot.com",
   messagingSenderId: "1076430489041",
   appId: "1:1076430489041:web:0e1da683f382aa55ba8cf0",
   measurementId: "G-2549503YTQ",
   databaseURL: "https://nilenet-c9b39-default-rtdb.firebaseio.com"
 };
 // Initialize Firebase
const fire=  firebase.initializeApp(firebaseConfig);



export default fire;