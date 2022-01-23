let weatherAPIkEY = "5fc8e9bc79a5a2e82d9c4120d41402cd";
let lat = 53.75014;
let lon = -7.266155;

$.ajax({
  method: "GET",
  url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIkEY}`,
}).done(function (data) {
  console.log(data);
}).fail(function () {
  // throw error if request fails
  alert("weather failed");
});

