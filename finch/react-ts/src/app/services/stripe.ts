import { loadStripe } from '@stripe/stripe-js';
import * as firebase from 'firebase';

import { asyncMap } from '../utils';

const db = firebase.firestore();
const { api_key } = (process.env as any).app.app.stripe;

export async function getUserAccess() {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
  return decodedToken.claims.stripeRole;
}

export function fetchProducts() {
  return db.collection('Products')
    .where('active', '==', true)
    .get()
    .then((snap: any) => asyncMap(snap.docs, async (doc: any) => {
      const product = doc.data();
      const priceList = await doc.ref.collection('prices').get();

      // only advertise single $2.99 / mo pro plan
      const price = priceList.docs.find((p: any) => p.data().unit_amount === 299);
      product.price = { ...price.data(), id: price.id };
      return product;
    }));
}

// initiate checkout session to subscribe to a plan
export async function subscribeToPlan(plan_price_id: string, unload?: () => void) {

  const user = firebase.auth().currentUser;
  const checkoutSession = await db.collection('Customers')
    .doc(user.uid)
    .collection('checkout_sessions')
    .add({
      price: plan_price_id,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  // wait for CheckoutSession to get attached by the extension
  checkoutSession.onSnapshot(async (snap: any) => {
    const { error, sessionId } = snap.data();
    if (error) {
      console.error('problems', error);
      unload();
    }
    if (sessionId) {
      // redirect to Checkout in Stripe portal
      const stripe = await loadStripe(api_key);
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

// note: look into referral link to get more "free" time on PRO "promo codes"
export function watchUserPlan(receive: (subscription: any) => void) {

  const user = firebase.auth().currentUser;

  if (!user) {
    return () => 'noop';
  }

  return db.collection('Customers')
    .doc(user.uid)
    .collection('subscriptions')
    .where('status', 'in', ['trialing', 'active'])
    .onSnapshot((snap: any) => {
      const [ subscription ] = snap.docs;
      receive(subscription ? subscription.data(): null);
    });
}

// Manage subscription, billing history, and payment methods
export async function redirectToBilling(unload?: () => void) {
  const createLink = firebase.functions().httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  // redirect back to profile page
  const { data: { url: billingLink } } = await createLink({ returnUrl: window.location.origin });
  window.location.assign(billingLink);
  unload();
}
