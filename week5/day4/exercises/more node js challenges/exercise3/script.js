const { getNextHolidayInfo } = require('./date');

const holidayInfo = getNextHolidayInfo();

console.log(`The next holiday is ${holidayInfo.nextHoliday}, and it's in ${holidayInfo.timeLeft.days} days and ${holidayInfo.timeLeft.hours}:${holidayInfo.timeLeft.minutes}:${holidayInfo.timeLeft.seconds} hours`);
