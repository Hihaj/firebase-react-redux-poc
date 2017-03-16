## Purpose of this POC

This is an example of integrating nodes from a Firebase realtime database with a Redux state
tree. The approach used here is to define a *saga* for subscribing to Firebase `value` events
for the relevant nodes. The same effect could easily be achieved by just adding a `value` event
handler and dispatching directly to the store from it. Since most apps will probably need to
*write* to the database as well though, I decided to encapsulate the entire integration in sagas. 

## How to run

1. Create a Firebase project.
2. Export an environment variable called `REACT_APP_FIREBASE_CONFIG` containing your Firebase
   configuration in JSON format. This will be parsed and passed to `firebase.initializeApp`.
