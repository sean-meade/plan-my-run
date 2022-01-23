let weatherAPIKey = "4b75a5379ac94accbd0233223222201";
let latLong = "53.75014,-7.266155";
// day 3 is two days away (includes today)
let day = 3;
let hour = 17;

$.ajax({
  method: "GET",
  url: `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${latLong}&days=${day}&aqi=no&alerts=no&hour=${hour}`,
}).done(function (data) {
  let dayNo = data.forecast.forecastday.length - 1;
  console.log(data.forecast.forecastday[dayNo].day.condition);
  // Image from request 
  imageSrc = data.forecast.forecastday[dayNo].day.condition.icon;
  imageAlt = data.forecast.forecastday[dayNo].day.condition.text;
  document.getElementById('weather-output').innerHTML = `<img src="${imageSrc}" alt="${imageAlt}">`
}).fail(function () {
  // throw error if request fails
  alert("error for weather api");
});




// "https://api.weatherapi.com/v1/forecast.json?key=4b75a5379ac94accbd0233223222201&q=53.75014,-7.266155&days=1&aqi=no&alerts=no"
