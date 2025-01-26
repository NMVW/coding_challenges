export function throttle(fn = (...n: any) => n, delay = 1000) {

  // every time function called, 1000 minimum before calling again
  let isCalling: boolean = false;

  return (...args: any) => {
    if (!isCalling) {
      fn(...args);
      isCalling = Boolean(setTimeout(() => isCalling = false, delay));
    }
  }

}

export function sortBy(list: any[] = [], prop: string, isAscending = true) {
  const [...nestedProps] = prop.split('.');
  const nest = (obj: any) => nestedProps.reduce((value: any, field: string) => value[field], obj);
  return list.sort((a, b) => nest(a) > nest(b) && isAscending ? 1: -1);
}

export function dateify(utcDateString: string | Date) {
  if (utcDateString === 'TBD') {
    return 'TBD';
  }
  // add a day to go from utc to mst local
  return new Intl.DateTimeFormat('en-US').format(new Date(utcDateString));
}

export function getMonthsFromNow(date: string | Date) {
  const now = new Date();
  const eventDate = new Date(date);
  const timeInMonth = 1000 * 60 * 60 * 24 * 365 / 12;
  return Math.round((eventDate.getTime() - now.getTime()) / timeInMonth);
}

export async function asyncMap (list: any = [], iterator = async (el: any) => el, delay = 1000) {

  const results = [];

  for (const el of list) {
    results.push(await slow(() => iterator(el), delay));
  }

  return results;
}

function slow (fn: () => unknown, delay: number) {
  return new Promise((resolve, reject) => setTimeout(resolve(fn()) as any, delay));
}
