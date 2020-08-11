import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDA7JptS9VedYYmDAqDueJvkXx5n4fIHwU",
authDomain: "test-ecommerce-b68d1.firebaseapp.com",
databaseURL: "https://test-ecommerce-b68d1.firebaseio.com",
projectId: "test-ecommerce-b68d1",
storageBucket: "test-ecommerce-b68d1.appspot.com",
messagingSenderId: "737430624309",
appId: "1:737430624309:web:54f855f3f46126fe11397c"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);