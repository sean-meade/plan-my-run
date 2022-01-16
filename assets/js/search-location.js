/* 
    Search Location
    https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-no-map/
*/

function createGeoCoder() {
  // Create search field for location
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood",
  });

  // Add geocoder to div
  geocoder.addTo("#geocoder");

  return geocoder;
}

function centerMapOnSearch(e, map) {
  // Add geocoder result as center of map.
  let chosenLocation = e.result.center;
  map.flyTo({
    center: chosenLocation,
  });
}

function noCurrentLocation() {
  alert("Could not find your current location.");
}

function useCurrentLocation() {
  // Get current geo location position
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // get long and lat (has to be in this order for MapBox)
      let currentLoc = [position.coords.longitude, position.coords.latitude];

      map.flyTo({
        center: currentLoc,
      });
    },
    noCurrentLocation,
    {
      enableHighAccuracy: true,
    }
  );
}
