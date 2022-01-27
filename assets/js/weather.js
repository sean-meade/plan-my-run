let weatherAPIkEY = "5fc8e9bc79a5a2e82d9c4120d41402cd";

function printOut(weatherAPIkEY) {
  console.log(weatherAPIkEY);
}

/**
 *
 *
 * @param {Array} latLon an array containing two floats with a max 6 decimal
 *                        places representing latitude and longitude
 * @param {String} weatherAPIkEY string containing weather API key from weatherapi.com
 */
async function weatherAPIRequest(latLon, weatherAPIkEY) {
  // console.log(latLon, weatherAPIkEY);
  $.ajax({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&units=metric&appid=${weatherAPIkEY}`,
  })
    .done(function (weatherData) {
      let weatherTime = document.getElementById("weather-input-time").value;
      // https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-jquery-or-javascript
      let weatherDay = document
        .getElementById("weather-input-day")
        .value.split(",");

      let today = new Date();

      let hour = parseInt(weatherTime);
      let day = parseInt(weatherDay[0]);
      let month = parseInt(weatherDay[1]) + 1;

      if (
        !weatherTime ||
        !weatherDay ||
        (hour <= today.getHours() && day === today.getDate())
      ) {
        alert(
          "Please choose a day and time either now or in the future",
          "warning",
          "weather-output"
        );
      } else if (day === today.getDate() && hour >= 21) {
        hour = 0;
        day = day + 1;
      }

      let relWeatherData = getRelevantWeatherData(
        weatherData,
        hour,
        day,
        month
      );

      // function to fill div after getting all the relevant information
      // raindrop icon:
      // edited with: https://www4.lunapic.com/
      document.getElementById("weather-output").innerHTML = `
        <div id="weather-info">
          <img src="https://openweathermap.org/img/w/${
            relWeatherData.weather[0].icon
          }.png" alt="" srcset=""> 
          <div class="weather-item"><span>|</span> ${
            relWeatherData.main.temp
          } &deg;C</div>
          <div class="weather-item" id="temp-max-min">
            <div>${relWeatherData.main.temp_max} &deg;C</div>
            <div>${relWeatherData.main.temp_min} &deg;C</div>
          </div>
          <div class="weather-item"><span>|</span><img src="assets/images/raindrop-icon.png"/> ${
            relWeatherData.pop * 100
          } %</div>
          <div class="weather-item"><span>|</span> ${
            relWeatherData.wind.speed
          } km/h</div>
          <div class="weather-item"><span>|</span> ${
            relWeatherData.wind.deg
          } deg</div>
        </div>`;
    })
    .fail(function () {
      // throw error if request fails
      alert(
        "Request failed for weather information",
        "warning",
        "weather-output"
      );
    });
}

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
  // console.log(parseInt(day), parseInt(hour), parseInt(month));
  return [parseInt(day), parseInt(hour), parseInt(month)];
}

/**
 * Loops through the weather data and find the relevent element based on input hour, day, and month
 *
 * @param {*} weatherData
 * @param {*} hour
 * @param {*} day
 * @param {*} month
 * @returns
 */
function getRelevantWeatherData(weatherData, hour, day, month) {
  for (let i = 0; i < weatherData.list.length - 1; i++) {
    let [dayi, houri, monthi] = getDayHourMonth(weatherData, i);
    let [dayip1, hourip1, monthip1] = getDayHourMonth(weatherData, i + 1);
    if (month == monthi && day == dayi) {
      // if the i plus 1 entry is 00:00 then give the value of 24
      if (hourip1 == 0) {
        hourip1 = 24;
      }
      // if the hour is the same as in the data
      if (hour == houri) {
        return weatherData.list[i];
      } else if (hour < hourip1 && hour >= houri) {
        // else if the hour is within a range
        return weatherData.list[i];
      }
    }
  }
}

// --------------------- Entry Point ---------------------
// For icon solution: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
document.getElementById("get-weather").onclick = function () {
  if (clickRoute[0]) {
    let latLon = [clickRoute[0][1], clickRoute[0][0]];
    // make request for allWeatherData with latLon and day
    weatherAPIRequest(latLon, weatherAPIkEY);
  } else {
    alert("No Starting point selected", "warning", "weather-output");
  }
};
