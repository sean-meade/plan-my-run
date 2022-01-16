// API Key
mapboxgl.accessToken = "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g"

// Initialize a map with the center being an view of Ireland
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
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
  console.log(e.result.center);
  map.setCenter(e.result.center);
});