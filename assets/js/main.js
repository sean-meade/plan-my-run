// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja2oxcDdlNG4wOHRtMnJwaThqaXNsb3c0In0.b3gF1oc--lsBuTigpSurDg";

// Check to see if mapbox is supported and either load map or trigger alert
let map = checkMapboxSupport();

// Create GeoCoder for searching location
let geocoder = createGeoCoder();

// If location searched update map center
geocoder.on("result", (e) => {
  centerMapOnSearch(e, map);
});
