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

function useCurrentLocation() {
  // Get current geo location position
	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy: true,
	});

  
}