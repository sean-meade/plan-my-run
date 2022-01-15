// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja2oxcDdlNG4wOHRtMnJwaThqaXNsb3c0In0.b3gF1oc--lsBuTigpSurDg";

/* 
  Once Window has loaded the map and search location is then loaded.
*/
window.onload = function () {

  /* 
    Search Location
    https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-no-map/
  */

  // Create search field for location 
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood",
  });

  // Add geocoder to div
  geocoder.addTo("#geocoder"); 

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
  
  // Add geocoder result as center of map.
  geocoder.on("result", (e) => {
    let chosenLocation = e.result.center;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: chosenLocation,
      zoom: 9,
    });
  });
  
  

}