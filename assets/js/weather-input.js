
// https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript/8674667
let min = 00,
    max = 23,
    selectTime = document.getElementById('weather-input-time');

for (let t = min; t <= max; t++){
    let opt = document.createElement('option');
    opt.value = t;
    if (t < 10) {
      opt.innerHTML = "0" + t + ":00";
    } else {
      opt.innerHTML = t + ":00";
    }
    
    selectTime.appendChild(opt);
}

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

// https://stackoverflow.com/questions/563406/add-days-to-javascript-date
// A function that adds a number of days to the given date and returns the date
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

let currentdate = new Date();
let datesArray = [currentdate]
for (let dayNo = 1; dayNo < 4; dayNo++) {
  datesArray.push(currentdate.addDays(dayNo))
}
    // startDayOption = currentdate.getDay(),
let selectDay = document.getElementById('weather-input-day');

// console.log(datesArray[1].getDate());

for (let d = 0; d < 4; d++){
  let opt = document.createElement('option');
  // value is [dayNo, MonthNo]
  opt.value = [parseInt(datesArray[d].getDate()), parseInt(datesArray[d].getMonth())];
  opt.innerHTML = dayNames[datesArray[d].getDay()];
  selectDay.appendChild(opt);
}

