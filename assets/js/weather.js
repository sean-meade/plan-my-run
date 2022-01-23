// let weatherAPIkEY = "5fc8e9bc79a5a2e82d9c4120d41402cd";
// let lat = 53.75014;
// let lon = -7.266155;

// $.ajax({
//   method: "GET",
//   url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIkEY}`,
// }).done(function (data) {
//   console.log(data);
// }).fail(function () {
//   // throw error if request fails
//   alert("weather failed");
// });



// variables to act as input
let hour = 00;
let day = 25;
let month = 01;

/**
 * Returns an array with day, hour, and, month (as ints) of the ith element in weather array
 * 
 * @param {number} i 
 * @returns {array} containing day, hour, and, month
 */
function getDayHourMonth(i) {
  let day = weatherData.list[i].dt_txt.substring(8, 10);
  let hour = weatherData.list[i].dt_txt.substring(10, 13);
  let month = weatherData.list[i].dt_txt.substring(5, 7);
  return [parseInt(day), parseInt(hour), parseInt(month)];
}

// console.log(weatherData.list);


document.getElementById('get-weather').onclick = function (){

  if (clickRoute[0]) {
    let val = [clickRoute[0][1], clickRoute[0][0]];
  document.getElementById('weather-output').innerHTML = val;
  } else {
    alert("No Starting point selected", "warning", "weather-output")
  }
  
}


/**
 * Loops through the weather data and find the relevent element based on input hour, day, and month
 */
for (let i = 0; i < 39; i++) {
  let [dayi, houri, monthi] = getDayHourMonth(i);
  let [dayip1, hourip1, monthip1] = getDayHourMonth(i + 1);
  if (month == monthi && day == dayi) {
    // console.log(hourip1, hour, houri);
    // if the i plus 1 entry is 00:00 then give the value of 24
    if (hourip1 == 0) {
      // console.log(hourip1, hour, houri);
      hourip1 = 24;
    }
    // if the hour is the same as in the data
    if (hour == houri) {
      // console.log(weatherData.list[i], 1);
      break;
    } else if (hour < hourip1 && hour >= houri) {
      // else if the hour is within a range
      // console.log(weatherData.list[i], 2);
    }
  }
}
