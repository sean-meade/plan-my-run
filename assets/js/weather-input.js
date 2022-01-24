
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

// https://www.delftstack.com/howto/javascript/javascript-get-week-number/#:~:text=The%20getDay()%20function%20returns,current%20week%20number%20is%20calculated.&text=Copy%20currentdate%20%3D%20new%20Date(),)%3B%20var%20numberOfDays%20%3D%20Math.

let currentdate = new Date()
    startDayOption = currentdate.getDay(),
    selectDay = document.getElementById('weather-input-day');

console.log(currentdate.getMonth());

for (let d = startDayOption; d <= startDayOption + 3; d++){
  let opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = dayNames[i];
  selectDay.appendChild(opt);
}