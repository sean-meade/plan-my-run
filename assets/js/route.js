// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// an empty geoJSON feature collection for place holder
var placeholder = turf.featureCollection([]);

// Initialize a map with the center being an view of Ireland
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-7.266155, 53.75014],
  zoom: 9,
}); // map variable

// Create search field for location
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "country,region,place,postcode,locality,neighborhood",
});

// Add geocoder to div
geocoder.addTo("#geocoder");

// Set location Chosen to false
let locationChosen = false;

// If location searched update map center
geocoder.on("result", (e) => {
  map.setCenter(e.result.center);
});

// set center of map to current location if success
function successCurrentLocation(e) {
  // console.log([e.coords.longitude, e.coords.latitude]);
  map.setCenter([e.coords.longitude, e.coords.latitude]);
}

// If current location can't be found send alert
function errorCurrentLocation(e) {
  alert("Couldn't find your current location");
}

// Function called when button is pressed for using current location
function useCurrentLocation(e) {
  navigator.geolocation.getCurrentPosition(
    successCurrentLocation,
    errorCurrentLocation,
    {
      enableHighAccuracy: true,
    }
  );
}

// a geoJSON feature collection to track clicks to add markers to map
var clicks = turf.featureCollection([]);

// When map is clicked collect lat and lng
map.on("click", function (e) {
  var coords = e.lngLat;
  var click = [coords.lng, coords.lat];
  // click to clicks
  clicks.features.push(click);
  console.log();
  if (clicks.features.length == 1) {
      // add layer to first click
      map.getSource('starting-point').setData(turf.featureCollection([turf.point(click)]));
  }
}); // map on click

// Set first click or current location with starting point symbol
// Create layer for it when map has loaded:
map.on("load", function () {
  map.addLayer({
    id: "starting-point",
    type: "circle",
    source: {
      data: placeholder,
      type: "geojson",
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "white",
      "circle-stroke-color": "#3887be",
      "circle-stroke-width": 3,
    },
  });
});

