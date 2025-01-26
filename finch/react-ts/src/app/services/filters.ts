import { useCallback, useEffect, useState } from 'react';

import { getMonthsFromNow } from '../utils';
import { GPS } from './gps';
import { watchUserSettings } from './api';

export const defaultFilters: Filters = {
  searchText: '',
  lookAhead: 12,
  nearby: {
    point: {
      city: 'Boulder',
      state: 'CO',
      coordinates: { latitude: 40.0150, longitude: -105.2705},
    },
    radius: 500,
  },
  organizationNames: [],
};

export function useFilters(): [Filters, (events: any[]) => any[]] {

  const [ filters, setFilters ] = useState(defaultFilters);

  useEffect(() => watchUserSettings(undefined, 'eventFilters', setFilters), []);

  const hasCoords = ({ coordinates }: Filters["nearby.point"]) => coordinates && typeof coordinates.latitude === 'number' && typeof coordinates.longitude === 'number';

  const filterEvent = useCallback((ev: any) => {

    // test all active filters against event data
    for (const filterName in filters) {

      const value = filters[filterName];

      switch (filterName) {
        case 'searchText':
          // only search visible text fields for user
          if (!Boolean(JSON.stringify([ev.organization.name, ev.club, ev.address.city, ev.address.state]).match(value))) {
            return false;
          }
          break;
        case 'lookAhead':
          const eventStart = new Date(ev.time.start);

          if (Number.isNaN(eventStart.getMonth()) || getMonthsFromNow(eventStart) > value) {
            // TBD unscheduled starts should be filtered out
            return false;
          }
          break;
        case 'nearby':

          if (!hasCoords(ev)) {
            return false;
          }

          // check proximity with current address
          const { latitude, longitude } = ev.coordinates;
          const { latitude: lat, longitude: lon } = value.point.coordinates;
          const meters = GPS.getDistance({ latitude: lat, longitude: lon }, { latitude, longitude });

          if (GPS.convertToMiles(meters) > value.radius) {
            return false;
          }
          break;
        case 'organizationNames':
          if (value.length && !value.includes(ev.organization.name)) {
            return false;
          }
          break;
        default:
          console.log('Filter unknown', filterName, filters[filterName]);
          break;
      }
    }

    return true;

  }, [filters]);

  const applyFilters = useCallback((events: any[]) => events.filter((ev: any) => filterEvent(ev)), [filterEvent]);

  return [ filters, applyFilters ];

}

export enum FilterName { SEARCH_TEXT = 'searchText', LOOK_AHEAD = 'lookAhead', NEARBY = 'nearby', ORGANIZATION_NAMES = 'organizationNames' };

export type Point = {
  city: string
  state: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export type Filters = {
  searchText: string
  lookAhead: number
  nearby: {
    point: Point
    radius: number // miles from point
  }
  organizationNames: string[]
  [name: string]: string | number | string[] | any
}
