// powered by browser localStorage api
import { Watcher } from './watcher';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
  Storage designed to persist data on client beyond refreshes and app-closes
*/
class Storage extends Watcher {

  private static storageName = 'ak9_storage'
  private static storageData: any

  private static get uids() {
    return Object.keys(this.storageData);
  }

  public static pull() {

    if (!localStorage) {
      throw new Error(`Browser localStorage api not available to power local app caching`);
    }

    let storage = localStorage.getItem(this.storageName);
    if (!storage) {
      // init if not already exists
      storage = JSON.stringify({ uids: [] });
      localStorage.setItem(this.storageName, storage);
    }

    const data = JSON.parse(storage);
    this.storageData = data;
  }

  public static push() {
    localStorage.setItem(this.storageName, JSON.stringify(this.storageData));
  }

  public static init(id = '', defaultData: any = null) {
    if (id === '') {
      throw new Error(`Storage api requires "id" to store data`);
    }

    const existingData = Storage.storageData[id];
    if (!Boolean(existingData)) {
      Storage.storageData[id] = defaultData;
    }

    return this;
  }

  public static getData(id: string) {
    return Storage.storageData[id];
  }

  public static setData(id: string, data: any) {
    Storage.storageData[id] = data;
    Storage.emit(id, data);
    // might get expensive to persist everything on every piece-wise save
    Storage.push();
  }

}

Storage.pull();

export function useStorage(id = '', defaultData: any = null) {

  const container = useRef(Storage.init(id, defaultData));
  const [ data, _setData ] = useState(container.current.getData(id));

  const setData = useCallback((newData: any) => {
    container.current.setData(id, newData);
    _setData(newData);
  }, [id]);

  useEffect(() => Storage.watch(id, _setData), [id]);

  return [ data, setData ];
}

export default Storage;
