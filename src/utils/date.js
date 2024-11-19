const DayNames = ["Sunday", "Monday", "Tuesday", "WednesDay", "Thursday", "Friday", "Saturday"];
const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const OneDayInMiliSecond = 24 * 60 * 60 * 1000;

export const dateFormatterLong = (date = new Date()) => {
  if (typeof date == "number") date = Date.parse(date);
  else if (!date instanceof Date) throw new Error("Invalid Date");

  return {
    day: DayNames[date.getDay()],
    month: MonthNames[date.getMonth()],
    date: date.getDate().toString(),
    year: date.getFullYear().toString(),
  };
};

export const getDaysPassedSinceEpoch = (date) => Math.floor(date / OneDayInMiliSecond);
