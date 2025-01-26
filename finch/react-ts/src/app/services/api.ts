import * as firebase from 'firebase';

// db global for all store calls
const db = firebase.firestore();

import { asyncMap } from '../utils';

export enum CONSTANTS {
  SAVE_LIMIT = 10,
}

export function fetchUserSettings(userId: string = firebase.auth().currentUser.uid) {
  return db.collection('UserSettings').doc(userId).get().then((res: any) => res.data());
}

export function watchUserSettings(user: any = firebase.auth().currentUser, field: string, receive: (userSettingsSlice: any) => void) {
  if (!user) {
    return () => ({});
  }
  return db.collection('UserSettings')
    .doc(user.uid)
    .onSnapshot((snap: any) => {
      const data = snap.data();
      if (field && data[field]) {
        return receive(data[field]);
      }
      return receive(snap.data());
    });
}

export function updateUserSettings(userId: string = firebase.auth().currentUser.uid, field: string, value: any) {

  const settingsRef = db.collection('UserSettings').doc(userId);

  if (field) {
    return settingsRef.update({ [field]: value });
  }

  return settingsRef.set(value);
}

export function toggleSavedEvent(id: string, shouldSave: boolean) {
  const arrayAction = shouldSave ? 'arrayUnion': 'arrayRemove';
  return updateUserSettings(undefined, 'savedEventIds', firebase.firestore.FieldValue[arrayAction](id));
}

export function upsertDogEvent(dogEvent: any) {
  const upsert = firebase.functions().httpsCallable('API-upsertDogEvent');
  // CQSR => returns true for new, false for existing
  delete dogEvent.isOwner;
  cleanTime(dogEvent);
  return upsert(dogEvent).then((res: any) => res.data);
}

function cleanTime(dogEvent: any) {

  // utc encodes date forward when serialized back from db (-1 until figured out better timezone handling of date)
  const msToDay = 1000 * 60 * 60 * 24;

  dogEvent.time.start = new Date(dogEvent.time.start.getTime() - msToDay);
  if (dogEvent.time.end && dogEvent.time.end.getTime) {
    dogEvent.time.end = new Date(dogEvent.time.end.getTime() - msToDay);
  }

  // time must be in utc format or will break upsert!
  dogEvent.time.end = ['TBD', null].includes(dogEvent.time.end) ? null: typeof dogEvent.time.end !== 'string' ? dogEvent.time.end.toUTCString(): dogEvent.time.end;
  dogEvent.time.start = typeof dogEvent.time.start !== 'string' ? dogEvent.time.start.toUTCString(): dogEvent.time.start;
}

export async function deleteDogEvent(dogEventId: string) {
  const dogEventRef = db.collection('DogEvents').doc(dogEventId);
  const privateInfoRef = dogEventRef.collection('PrivateEventInfo').doc('private');
  // gotcha: privateInfo holds event ownership metadata - security rules need it to allow parent doc deletion
  await dogEventRef.delete();
  await privateInfoRef.delete();
}

export function fetchActiveOrgs() {
  const fetch = firebase.functions().httpsCallable('API-fetchActiveOrganizations');
  return fetch(null).then((res: any) => res.data);
}

/**
  Colorado city autocomplete for event creation
*/
export async function fetchCityAutocomplete(searchText: string) {
  const fetch = firebase.functions().httpsCallable('API-autocompleteCity');
  const cities = await fetch({ searchText });
  return cities.data;
}

export async function fetchCityGeocode(city: string) {
  const fetch = firebase.functions().httpsCallable('API-geocodePlace');
  const point = await fetch({ city, state: 'CO' });
  return point.data;
}

export type ChangeSet = {
  added: {[city: string]: number}
  removed: {[city: string]: number}
  updated: {[city: string]: number}
};

export function watchDogEvents(state: string, limit: number, receive: (dogEvents: any[], changes: ChangeSet) => void): () => void {

  // Client-side PRO geofiltering by city / radius:
  // - geofirestore too complicated and opinionated => geofirex considered but requires rxjs https://github.com/codediodeio/geofirex

  // typical total CO agility events across all orgs usually < 30 (monitor closely in case need to adjust limit api)
  return db.collection('DogEvents')
    .where('address.state', '==', state)
    .orderBy('time.start', 'desc')
    .limit(limit)
    .onSnapshot(async (snap: any) => {

      const userSettings = await fetchUserSettings();
      const ownedEventIds = await fetchDogEventsOwned();

      const fullSet = snap.docs.map((doc: any) => serializeDogEventDoc(doc, {
        isSaved: userSettings && userSettings.savedEventIds.includes(doc.id),
        isOwned: ownedEventIds.has(doc.id)
      }));
      const changeSet = deriveChangeSet(snap, 'address.city');

      receive(fullSet, changeSet);
    });
}

export function watchDogEventsSaved(receive: (dogEvents: Array<any>) => void, savedEventIds: string[]) {

  // hard limit by firestore for array comparison 10 https://firebase.google.com/docs/firestore/query-data/queries#array_membership
  if (savedEventIds.length > 0) {

    return db.collection('DogEvents')
      .where(firebase.firestore.FieldPath.documentId(), 'in', savedEventIds)
      .limit(CONSTANTS.SAVE_LIMIT)
      .onSnapshot((snap: any) => receive(snap.docs
          .map((doc: any) => serializeDogEventDoc(doc, { isSaved: true }))
      ));
  }

  receive([]);

  return () => 'queryless';
}

export function watchDogEventsOwned(receive: (dogEvents: Array<any>) => void): () => void {

  const myUser = firebase.auth().currentUser;

  return db.collectionGroup('PrivateEventInfo')
    .where('userRoles.owner', '==', myUser.uid)
    .onSnapshot(async (snap: any) => {
      const ownedEvents = await asyncMap(snap.docs, (privateDoc: any) => privateDoc.ref.parent.parent.get());
      // if empty owned event entities show up, orphaned private event info sub docs need to be cleaned up
      receive(ownedEvents.filter((e: any) => e.data()).map((dogEvent: any) => serializeDogEventDoc(dogEvent, { isOwned: true })));
    });
}

function fetchDogEventsOwned(): Promise<Set<string>> {

  const myUser = firebase.auth().currentUser;

  return db.collectionGroup('PrivateEventInfo')
    .where('userRoles.owner', '==', myUser.uid)
    .get()
    .then((snap: any) => serializePrivateEventInfoDocs(snap));
}

function serializePrivateEventInfoDocs(privateSnap: any): Set<string> {
  return privateSnap.docs.reduce((ownership: Set<string>, privateDoc: any) => {

    const parentDogEventId = privateDoc.ref.parent.parent.id; // PrivateEventInfoDoc => PrivateEventInfoCollection => DogEventDoc
    ownership.add(parentDogEventId);
    return ownership;

  }, new Set());
}

function serializeDogEventDoc(eventDoc: any, addFields?: any) {

  const dogEvent = eventDoc.data();
  const start = dogEvent.time.start.toDate();

  if (addFields) {
    return {...dogEvent, id: eventDoc.id, time: { start }, ...addFields};
  }

  return {...dogEvent, id: eventDoc.id, time: { start }};
}

// Extract snap counts according to field key
function deriveChangeSet(snap: any, fieldKey: string): ChangeSet {
  return snap.docChanges().reduce((set: ChangeSet, change: any) => {

    const data = change.doc.data();

    switch (change.type) {
      case 'added':
        set.added[change.doc.id] = data;
        break;
      case 'removed':
        set.removed[change.doc.id] = data;
        break;
      case 'modified':
        set.updated[change.doc.id] = data;
        break;
      default:
        console.warn('Event change type not recognized', change.type);
    }

    return set;

  }, { added: {}, removed: {}, updated: {} });
}

export function sendFeedback(messageText: string) {
  const send = firebase.functions().httpsCallable('API-giveFeedback');
  return send({ text: messageText });
}
