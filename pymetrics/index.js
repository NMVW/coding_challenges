// Given a date and a number of days N, write a function that returns a date that is N number of days in the future from the given date

function getFutureDate(startDate: Date, numOfDays: number): Date {
	
  // start date add n days to get new date, futureDate
  let NUM_DAYS_IN_MONTH = [31, 28, 31, 30...]

  const startYear: number = startDate.getFullYear();
  const startMonth: number = startDate.getFullMonth(); // 0, 1, 2, 3,
  const startDay: number = startDate.getFullDay();

  // month spill over: start = 2020 12 31
  // n = 35
  // output date: 2021 1 5
  
  // month spill over: start = October 31, 2020
  // n = 5

  
  // within start month: start = 2020 11 1
  // n = 5

  let futureDay: number = startDay + numOfDays; // 66
  let futureMonth: number = startMonth; // 11
  let futureYear: number = startYear; // 2020
  
  // const isCrossingMonth = NUM_DAYS_IN_MONTH[startMonth] < futureDay;
  // spill over month
  while (NUM_DAYS_IN_MONTH[futureMonth] < futureDay) { 

    // month spill over: start 31 + 5 futureDay 36
  	futureDay = futureDay - NUM_DAYS_IN_MONTH[futureMonth]; 
    // futureDay 5
    
    const isCrossingYear = futureMonth === 11;
    
    // crossing calendar year!
    if (isCrossingYear) {
    	futureMonth = 0;
      futureYear = futureYear + 1;
    } else {
      // reached here ? month crossing
      futureMonth = futureMonth + 1;
    }
  
    // when to bail?
    // futureDay <= max in futureMonth
    const timeToBail = futureDay <= NUM_DAYS_IN_MONTH[futureMonth];
    if (timeToBail) {
    	break;
    }
  }

  const futureDate = getDate(futureYear, futureMonth, futureDay);

  return futureDate;
}

function getDate(year: number, month: number, day: number): Date {
  return new Date(...)
}