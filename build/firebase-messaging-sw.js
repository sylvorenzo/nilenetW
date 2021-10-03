importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDK_Bhc2ZFcn4eFIvyGVqmy1xFPjQlQBdA",
    authDomain: "nilenet-c9b39.firebaseapp.com",
    projectId: "nilenet-c9b39",
    storageBucket: "nilenet-c9b39.appspot.com",
    messagingSenderId: "1076430489041",
    appId: "1:1076430489041:web:0e1da683f382aa55ba8cf0",
  
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload){
    console.log('Received background message', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions={
        body: payload.notification.body,
    };
    self.ServiceWorkerRegistration.showNotification(notificationTitle,notificationOptions);
})