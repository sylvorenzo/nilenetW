// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken({ vapidKey: 'BCYAk5dwxsnlsXR5c1Mdx-qhzRHnjKUddeca7Q6Y6MFnTBC6P9uWjhPE1VuHT_Vle9tGCoDjhEFm93ZQGQmxGno' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });