/* Check and see if browser supports Mapbox */
function checkMapboxSupport() {
  if (!mapboxgl.supported()) {
    console.log("Doesnt work");
    // If it's not alert user
    alert("Your browser does not support Mapbox GL");
    return false;
  } else {
    console.log("Does work");
    // If it is load map
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
    
    return map;
  }

  
}