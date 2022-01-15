/* 
  Once Window has loaded the map is then loaded.
*/
window.onload = function () {
  // API Key
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja2oxcDdlNG4wOHRtMnJwaThqaXNsb3c0In0.b3gF1oc--lsBuTigpSurDg";

  // Checks to see if MapBox is support by the browser : https://docs.mapbox.com/mapbox-gl-js/example/check-for-support/
  if (!mapboxgl.supported()) {
    // If it's not alert user
    alert("Your browser does not support Mapbox GL");
  } else {
    // If it is load map
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
  }
};
