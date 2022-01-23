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
let day = 26;
let month = 01;

/**
 * Returns an array with day, hour, and, month (as ints) of the ith element in weather array
 * 
 * @param {number} i 
 * @returns {array} containing day, hour, and, month
 */
function getDayHourMonth(weatherData, i) {
  let day = weatherData.list[i].dt_txt.substring(8, 10);
  let hour = weatherData.list[i].dt_txt.substring(10, 13);
  let month = weatherData.list[i].dt_txt.substring(5, 7);
  return [parseInt(day), parseInt(hour), parseInt(month)];
}

// console.log(weatherData.list);

// For icon solution: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon

document.getElementById('get-weather').onclick = function (){

  if (clickRoute[0]) {
    let latLon = [clickRoute[0][1], clickRoute[0][0]];
    // make request for allWeatherData with latLon and day
    let relWeatherData = getRelevantWeatherData(weatherData)
    // function to fill div after getting all the relevant information
    document.getElementById('weather-output').innerHTML = `
    <img src="http://openweathermap.org/img/w/${relWeatherData.weather[0].icon}.png" alt="" srcset=""> 
    <p>Temp min ${relWeatherData.main.temp_min}</p>
    <p>Temp max ${relWeatherData.main.temp_max}</p>
    <p>Temp${relWeatherData.main.temp}</p>
    <p>Chance of rain${relWeatherData.pop}</p>
    <p>Wind Speed and direction (units?): ${relWeatherData.wind.speed}km/h ${relWeatherData.wind.deg} deg</p>`;
    console.log(relWeatherData);
  } else {
    alert("No Starting point selected", "warning", "weather-output")
  }
  
}


/**
 * Loops through the weather data and find the relevent element based on input hour, day, and month
 */

function getRelevantWeatherData(weatherData) {
  for (let i = 0; i < weatherData.list.length - 1; i++) {
    let [dayi, houri, monthi] = getDayHourMonth(weatherData, i);
    let [dayip1, hourip1, monthip1] = getDayHourMonth(weatherData, i + 1);
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
        return weatherData.list[i];
      } else if (hour < hourip1 && hour >= houri) {
        // else if the hour is within a range
        // console.log(weatherData.list[i], 2);
        return weatherData.list[i];
      }
    }
  }
}

