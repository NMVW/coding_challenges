import { useCallback, useEffect, useState } from 'react';
import * as geo from 'geolib';

export type Point = {
  latitude: number
  longitude: number
}

export class GPS {

  static convertToMiles(meters = 0) {
    return geo.convertDistance(meters, 'mi');
  }

  static orderByClosest(pointRef: Point, pointList: Point[]) {
   return geo.orderByDistance(pointRef, pointList);
  }

  private position: Point = null;

  private config = {
    timeout: 10 * 1000,
    maximumAge: 5 * 60 * 1000,
  }

  public async setDevicePosition(shouldSet: boolean): Promise<Point | null> {

    if (!shouldSet) {
      console.log('unpinned');
      this.position = null;
      return this.position;
    }

    if (!navigator.geolocation) {
      throw new Error(`Geolocation api not supported`);
    }

    // consent will be prompted here
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(position => {
      console.log('pinned', position.coords);
      this.position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      resolve(this.position);
    }, this.onError(reject), this.config));

  }

  public getDevicePosition() {
    return this.position;
  }

  // public orderByClosest(pointList: Point[]) {
  //   const ordered = GPS.orderByClosest(this.position, pointList);
  //   return ordered.map(point => ({ ...point, radius: this.getDistance(point) }));
  // }

  public static getDistance(pointA: Point, pointB: Point) {
    return geo.getDistance(pointA, pointB);
  }

  public getDistance(point: Point) {
    return geo.getDistance(this.position, point);
  }

  private onError(reject: (error: any) => void) {
    // console.log('Error occurred. Error code: ' + error.code, error);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    return (error: any) => reject(error);
  }

}

export const gps = new GPS();

export function useGPS(): [Point, boolean, (setter: boolean) => void] {

  const [ position, _setPosition ] = useState(gps.getDevicePosition());
  const [ isFetching, fetch ] = useState(false);

  useEffect(() => _setPosition(gps.getDevicePosition()), []);

  const setPosition = useCallback(async (shouldSet: boolean) => {
    fetch(true);
    const position = await gps.setDevicePosition(shouldSet);
    _setPosition(position);
    fetch(false);
  }, [gps]);

  return [
    position,
    isFetching,
    setPosition,
  ];
}
