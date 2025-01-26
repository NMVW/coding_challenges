import { useCallback, useEffect, useRef, useState } from 'react';
import * as firebase from 'firebase';

class Router {

  public get currentRoute() {
    return this.current;
  }

  public set currentRoute(route: string) {
    this.current = route;
  }

  constructor(private current: string) {}

}

export function useRouter(unauthRedirectRoute: string, defaultRoute: string) {

  const router = useRef(new Router(defaultRoute));

  const [ currentRoute, _setRoute ] = useState(router.current.currentRoute);

  const setRoute = useCallback((nextRoute: string) => {
    router.current.currentRoute = nextRoute;
    _setRoute(nextRoute);
  }, [currentRoute]);

  useEffect(() => firebase.auth().onAuthStateChanged((user: any) => {

    const isAuthenticated = Boolean(user);

    if (!isAuthenticated && currentRoute !== unauthRedirectRoute) {
      setRoute(unauthRedirectRoute);
      return;
    }

    if (location.search.match(/signedIn/)) {
      setRoute(isAuthenticated ? defaultRoute: unauthRedirectRoute);
      location.href = location.origin; // clear url fragment
      return;
    }

  }), [currentRoute]);

  return [ currentRoute, setRoute as any ];
}
