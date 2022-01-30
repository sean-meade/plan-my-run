// API Key for Mapbox
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// Initialize a map with the center being a view of Ireland
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-7.266155, 53.75014],
  zoom: 5,
}); // map variable