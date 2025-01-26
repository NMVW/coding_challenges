import { useState } from 'react';

export class Watcher {

  private static _observers: {
    [prop: string]: any[]
  } = {}

  public static watch(prop: string, fn = (data: any) => data) {
    if (!this._observers[prop]) {
      this._observers[prop] = [];
    }
    this._observers[prop].push(fn);
    return () => {
      this._observers[prop] = this._observers[prop].filter((f) => f !== fn);
      if (!this._observers[prop].length) {
        delete this._observers[prop];
      }
    };
  }

  protected static emit(prop: string, data: any) {
    if (this._observers[prop]) {
      this._observers[prop].forEach((f) => f(data));
    }
  }

}

export function useTimer (waitMs: number = 3000): [boolean, () => void] {

  const [ hasExpired, setExpiration ] = useState(false);

  const timeout = setTimeout(() => setExpiration(true), waitMs);

  return [ hasExpired, () => clearTimeout(timeout) ];
}
