// Plaid coding space

// endpoint: https://interview.plaid.com/data/recurring_transactions.txt
const testInput = [
  ["Netflix", 9.99, 10],
  ["Netflix", 9.99, 20],
  ["Netflix", 9.99, 30],
  ["Amazon", 27.12, 32],
  ["Sprint", 50.11, 45],
  ["Sprint", 50.11, 55],
  ["Sprint", 50.11, 65],
  ["Sprint", 60.13, 77],
];

// [vendor, amount, day 0-365]
function findRecurringVendors(masterTxnList = []) {

  const recurringVendors = []; // ["Netflix"]
  const vendorTxns = {}; // { "Netflix": [{amount, days}, {amount, days}, ...], "Amazon": [..], "Sprint": [...] }

  masterTxnList.forEach(([ vendor, amount, day ]) => {

    const txnList = vendorTxns[vendor];

    // initialization of vendor with first txn
    if (!txnList) {
      vendorTxns[vendor] = [{ amount, day }];
      return;
    }

    // add {amount, days}
    vendorTxns[vendor].push({ amount, day });
  });

  // vendorTxns is fully hydrated vendor txn categorization
  Object.entries(vendorTxns).forEach(([ vendor, txnList ]) => {

    // DETERMINE IF TXN is SUBSCRIPTION with vendor

    // min 3 times in list
    if (txnList.length >= 3) {

      // same amount
      if (txnsHaveSameAmounts(txnList)) {

        // same num days apart (at least 3 elements in the list)
        if (txnsSameDaysApart(txnList)) {

          // is a subscription
          recurringVendors.push(vendor);
        };

      }

    }

  });

  return recurringVendors;
}

function txnsSameDaysApart(txnList = []) {

  let areSameDaysApart = true;
  let prevTxn = txnList[0];

  const initialDaysApart = txnList[1].day - txnList[0].day;

  txnList.forEach((txn, index) => {

    // note: due to initial assignment outside of function scope
    if (index === 0) {
      return;
    }

    // same num days apart NOTE not checking for dupes
    if ((txn.day - prevTxn.day) !== initialDaysApart) {
      areSameDaysApart = false;
    }

    prevTxn = txn;
  });

  return areSameDaysApart;
}

function txnsHaveSameAmounts(txnList = []) {

  let areSameAmounts = true;
  const initialAmount = txnList[0].amount;

  txnList.forEach(({ amount }) => {
    if (amount !== initialAmount) {
      areSameAmounts = false;
    }
  });

  return areSameAmounts;
}

const sameAmountList = [
  { amount: 9.99 },
  { amount: 9.99 },
  { amount: 9.99 }
];

const sameDayDiffList = [
  { day: 10 },
  { day: 20 },
  { day: 30 }
];

// console.log(txnsSameDaysApart(sameDayDiffList));
console.log(findRecurringVendors(testInput));