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

function ceneterMapOnSearch(map) {
  // Add geocoder result as center of map.
  geocoder.on("result", (e) => {
    let chosenLocation = e.result.center;
    map.flyTo({
      center: chosenLocation,
    });
  });
}

function noCurrentLocation() {
  alert('Could not find your current location.');
}