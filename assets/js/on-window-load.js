// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja2oxcDdlNG4wOHRtMnJwaThqaXNsb3c0In0.b3gF1oc--lsBuTigpSurDg";

/* 
  Once Window has loaded the map and search location is then loaded.
*/
window.onload = function () {

  // Create GeoCoder
  let geocoder = createGeoCoder(); 

  // Create Map
  let map = checkMapboxSupport();

  // Add geocoder result as center of map.
  geocoder.on("result", (e) => {
    let chosenLocation = e.result.center;
    map.flyTo({
      center: chosenLocation
      });
    });
  
  

}