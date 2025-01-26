import 'react';
import { useEffect, useState } from 'react';

import * as firebase from 'firebase';

export function useAuth() {

  const [ isAuthenticated, setAuthenticated ] = useState(false);

  useEffect(() => firebase.auth().onAuthStateChanged(user => {
    // note: isAnonymous boolean indicates not a registered user yet
    setAuthenticated(Boolean(user));
  }), []);

  return [ isAuthenticated, () => firebase.auth().signOut() ];
}
