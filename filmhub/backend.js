/**Back-end Challenge
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/json-cleaning and then clean the object according to the following rules: Remove all keys that have values of N/A, -, or empty strings. If one of these values appear in an array, remove that single item from the array. Then console log the modified object as a string. */

const URL_TO_CLEAN = 'https://coderbyte.com/api/challenges/json/json-cleaning';
const DIRTY_VALUES = new Set(['N/A', '-', '']);
const axios = require('axios');

async function clean_url(url) {

  try {
    // 1. fetch data from endpoint
    const resp = await axios.get(url);
    // 2. scrub data
    console.log('INCOMING DATA', resp.data, '\n');
    const clean_data = clean_object(resp.data);
    // 3. log cleaned data
    console.log('\nCLEANED DATA', clean_data);
  } catch (err) {
    console.log(err.message);
  }

}

/**
 * Dirty criteria:
 * - key with value "N/A" | "-" | ""
 * - remove element from array value ["N/A"] | ["-"] | [""]
 */
function clean_object(data={}) {

  const cleaned_data = {}

  for (key in data) {

    // bad values
    if (DIRTY_VALUES.has(data[key])) {
      // exclude keys with dirty values
      continue;
    }

    // for arrays, filter out dirty elements
    if (Array.isArray(data[key])) {
      cleaned_data[key] = data[key].filter(el => !DIRTY_VALUES.has(el));
    } else if (typeof data[key] === 'object') {
      // recurse if not array but still an object
      cleaned_data[key] = clean_object(data[key]);
    } else {
      // primitive type for key value
      cleaned_data[key] = data[key];
    }

  }

  return cleaned_data;
}

clean_url(URL_TO_CLEAN);
