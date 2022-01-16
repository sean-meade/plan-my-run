// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// an empty geoJSON feature collection for place holder
var placeholder = turf.featureCollection([]);

// Initialize a map with the center being an view of Ireland
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
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
  map.setCenter(e.result.center);
});

// set center of map to current location if success
function successCurrentLocation(e) {
  // console.log([e.coords.longitude, e.coords.latitude]);
  map.setCenter([e.coords.longitude, e.coords.latitude]);
}

// If current location can't be found send alert
function errorCurrentLocation(e) {
  alert("Couldn't find your current location");
}

// Function called when button is pressed for using current location
function useCurrentLocation(e) {
  navigator.geolocation.getCurrentPosition(
    successCurrentLocation,
    errorCurrentLocation,
    {
      enableHighAccuracy: true,
    }
  );
}

// function that simply adds a marker where clicked
function addMarker(clicks) {
  map.getSource("route-points").setData(clicks);
}

// Set first click or current location with starting point symbol
// Create layers of start point and route points when map has loaded:
map.on("load", function () {
  // a geoJSON feature collection to track clicks to add markers to map
  var clicks = turf.featureCollection([]);

  map.addLayer({
    id: "starting-point",
    type: "circle",
    source: {
      data: placeholder,
      type: "geojson",
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "white",
      "circle-stroke-color": "#3887be",
      "circle-stroke-width": 3,
    },
  });

  // Add layer that will be used to mark clicks as dots
  // for the click route
  map.addLayer({
    id: "route-points",
    type: "symbol",
    source: {
      data: clicks,
      type: "geojson",
    },
    layout: {
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-image": "marker-15",
    },
  });

  // When map is clicked collect lat and lng
  map.on("click", function (e) {
    var coords = e.lngLat;
    var click = [coords.lng, coords.lat];

    // set the click as a geoJSON feature
    var pt = turf.point([click[0], click[1]], {
      orderTime: Date.now(),
      key: Math.random(),
    });
    
    // click to clicks
    clicks.features.push(pt);

    if (clicks.features.length === 1) {
      // add layer to first click
      map
        .getSource("starting-point")
        .setData(turf.featureCollection([turf.point(click)]));
    } else {
      console.log(clicks);
      // add click to route-points layer
      addMarker(clicks);
    }
  }); // map on click
});
