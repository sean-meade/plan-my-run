// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja2oxcDdlNG4wOHRtMnJwaThqaXNsb3c0In0.b3gF1oc--lsBuTigpSurDg";

// Create GeoCoder for searching location
let geocoder = createGeoCoder();

// Check to see if mapbox is supported and either load map or trigger alert
let map = checkMapboxSupport();

// If location searched update map to center
ceneterMapOnSearch(map);

// Get button to use current location
let button = document.getElementById("currentLocation");

// When button is clicked update map to current location
button.addEventListener('click', function () {

  // Get current geo location position
  navigator.geolocation.getCurrentPosition(function (position) {
    // get long and lat (has to be in this order for MapBox)
    let currentLoc = [position.coords.longitude, position.coords.latitude];
    
    map.flyTo({
      center: currentLoc,
    });
  }, noCurrentLocation, {
    enableHighAccuracy: true,
  });

});
