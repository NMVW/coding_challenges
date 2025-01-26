import * as Firebase from 'firebase/app';
import * as FirebaseUI from 'firebaseui';
import Storage from './localStorage';

// const {
//   core: coreConfig,
//   auth: authConf,
//   emulators,
// } = (process.env as any).app.firebase;

const coreConfig = {} as any;
const authConf = {tos_url: '', pp_url: '', domain: ''};

export const authConfig = {
  autoUpgradeAnonymousUsers: true,
  signInFlow: 'redirect',
  // signInSuccessUrl: `${window.location.host}?signedIn=true`,
  signInOptions: [
    Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
      provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    FirebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: authConf.tos_url,
  privacyPolicyUrl: () => window.location.assign(authConf.pp_url),
  callbacks: {

    signInSuccessWithAuthResult: (...params: any) => {
      // handle any client-side new login prep (cloud functions can listen to onLogin)
      window.location.assign(`${window.location.origin}?signedIn=true`);
      return false; // we got it from here (see Router)
    },

    // signInFailure callback must be provided to handle merge conflicts which
    // occur when an existing credential is linked to an anonymous user.
    signInFailure: (error: any) => {

      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
        return Promise.resolve(error);
      }

      // The credential the user tried to sign in with.
      const cred = error.credential;

      const anonymousUser = Firebase.auth().currentUser;
      // Copy data from anonymous user to permanent user and delete anonymous
      // user.
      // ...
      console.log('Find a way to merge anonymous user accumulated data with existing user', anonymousUser);
      // const existingUser = Firebase.auth().getUser(error.credential);
      // existingUser.update(anonymousUser);

      // Finish sign-in after data is copied.
      return Firebase.auth().signInWithCredential(cred);
    },

  },
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const appConfig = {
  apiKey: coreConfig.api_key,
  authDomain: authConf.domain,
  databaseURL: coreConfig.database_url,
  projectId: coreConfig.project_id,
  storageBucket: coreConfig.storage_bucket,
  messagingSenderId: coreConfig.messaging_sender_id,
  appId: coreConfig.id,
  measurementId: coreConfig.measurement_id
};
console.log((process.env as any));

Firebase.initializeApp(appConfig);

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/performance';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/remote-config';

// firebase.auth().onAuthStateChanged(user => { });
// firebase.database().ref('/path/to/ref').on('value', snapshot => { });

export async function registerPush() {

  const messagingKey = coreConfig.messaging_key;
  const messaging = Firebase.messaging();

  try {

    if ('serviceWorker' in navigator) {

      const serviceWorkerRegistration = await navigator.serviceWorker.register('/push.bundle.js');

      console.log('Service worker registration success', serviceWorkerRegistration);

      const registrationToken = await messaging.getToken({ vapidKey: messagingKey, serviceWorkerRegistration });

      console.log('FCM Service worker initialized', serviceWorkerRegistration, 'rt', registrationToken);

      // put in filters settings - toggle on / off "Get notified of new matches."
      const db = Firebase.firestore();
      const user = Firebase.auth().currentUser;
      await db.collection('UserSettings').doc(user.uid).update({ 'eventNotifications.pushTokens': Firebase.firestore.FieldValue.arrayUnion(registrationToken) });

      // messaging.requestPermission().then((res) => {
      //   debugger
      //   console.log('Accepted perms', res);
      // });

      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage((payload) => {
        if (payload.notification.title === 'New Dog Events') {
          Storage.setData('MessageNotice', `Ruff! New event matches.`);
        }
      });
    }

  } catch (err) {
    console.error('Service worker registration failed', err);
  }

}

function initRemoteConfig() {

  const {
    remote: {
      settings,
      defaultConfig,
    }
  } = (process.env as any).app.firebase;

  const remoteConfig = Firebase.remoteConfig();

  remoteConfig.settings = settings;
  remoteConfig.defaultConfig = defaultConfig;

  remoteConfig.fetchAndActivate(); // async function

  return (name: string) => remoteConfig.getValue(name);
}

export const getRemoteValue = initRemoteConfig();
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

Firebase.analytics(); // call to activate
// firebase.analytics().logEvent('tutorial_completed');
Firebase.performance(); // call to activate

export const useEmulator = () => {

  // Firebase must be previously initialized using firebase.initializeApp().
  const db = Firebase.firestore();
  const auth = Firebase.auth();
  const fns = Firebase.functions();

  // only run emulator locally right now
  // if (location.hostname === emulators.firestore.host) {
  //   console.log('Firebase emulator init firestore...');
  //
  //   // "useEmulator" deprecated https://github.com/firebase/snippets-web/blob/bd8330577c2ad7272163b8d74c20770e8179e267/firestore/emulator-suite.js#L6-L10
  //   db.settings({
  //     host: `${emulators.firestore.host}:${emulators.firestore.port}`,
  //     ssl: false,
  //   });
  // }
  //
  // if (location.hostname === emulators.auth.host) {
  //   console.log('Firebase emulator init auth...');
  //   // auth triggers not yet available for emulator https://github.com/firebase/firebase-tools/issues/2847
  //   auth.useEmulator(`http://${emulators.auth.host}:${emulators.auth.port}`);
  // }
  //
  // if (location.hostname === emulators.functions.host) {
  //   console.log('Firebase emulator init functions...');
  //   fns.useFunctionsEmulator(`http://${emulators.functions.host}:${emulators.functions.port}`);
  // }

};
