
// https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript/8674667
let min = 00,
    max = 23,
    selectTime = document.getElementById('weather-input-time');

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    if (i < 10) {
      opt.innerHTML = "0" + i + ":00";
    } else {
      opt.innerHTML = i  + ":00";
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

// https://www.delftstack.com/howto/javascript/javascript-get-week-number/#:~:text=The%20getDay()%20function%20returns,current%20week%20number%20is%20calculated.&text=Copy%20currentdate%20%3D%20new%20Date(),)%3B%20var%20numberOfDays%20%3D%20Math.

let currentdate = new Date(),
    startDayOption = currentdate.getDay(),
    selectDay = document.getElementById('weather-input-day');

console.log(currentdate.getMonth());

for (var i = startDayOption; i<=startDayOption+3; i++){
  var opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = dayNames[i];
  selectDay.appendChild(opt);
}