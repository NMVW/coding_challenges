// powered by browser memory
import { Watcher } from './watcher';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
  Store designed to hold state on client until session end (refresh / logout)
*/
class Store extends Watcher {

  private static storeName = 'ak9_store'
  private static storeData: { [name: string]: any }
  private static defaultData: any = { uids: [] };

  private static get uids() {
    return Object.keys(this.storeData);
  }

  public static pull() {
    // fill-in service hydration logic
    const data: {[name: string]: any} = { [this.storeName]: this.defaultData };
    this.storeData = data;
  }

  public static reset() {
    this.storeData = { [this.storeName]: this.defaultData };
  }

  public static push() {
    // fill-in wervice push logic
    this.storeData[this.storeName];
  }

  public static init(id = '', defaultData: any = null) {
    if (id === '') {
      throw new Error(`Store api requires "id" to store data`);
    }

    const existingData = Store.storeData[id];
    if (!Boolean(existingData)) {
      Store.storeData[id] = defaultData;
    }

    return this;
  }

  public static getData(id: string) {
    return Store.storeData[id];
  }

  public static setData(id: string, data: any) {
    Store.storeData[id] = data;
    Store.emit(id, data);
    // might get expensive to persist everything on every piece-wise save
    Store.push();
  }

}

Store.pull();

export function useStore(id = '', defaultData: any = null) {

  const container = useRef(Store.init(id, defaultData));
  const [ data, _setData ] = useState(container.current.getData(id));

  const setData = useCallback((newData: any) => {
    container.current.setData(id, newData);
    _setData(newData);
  }, [id]);

  useEffect(() => Store.watch(id, _setData), [id]);

  return [ data, setData, () => container.current.reset() ];
}

export default Store;
