// calculate monthly bill
//
// activeSubscription {
//   monthlyPriceInDollars,
//   customerId,
// }
//
// month '2020-01'
//
// users [
//   {
//     name,
//     activatedOn: Date, // any day of any year
//     deactivatedOn: Date || null, // any day of any year
//   },
// ]

function billForMonth(month, activeSubscription, users=[]) {
  const bill = 0;
  if (!activeSubscription || !users.length) {
    return bill;
  }
  const { monthlyPriceInDollars } = activeSubscription;
  return users.reduce((totalBill, user) => {
    const { activatedOn, deactivatedOn } = user;
    // determine total active days in current month for user
    totalBill += days * dailyPriceInDollars;
    return totalBill;
  }, bill);
}
