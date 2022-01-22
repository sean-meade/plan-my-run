// API Key for Mapbox
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// an empty geoJSON feature collection for place holder
let placeholder = turf.featureCollection([]);

// a geoJSON feature collection to track clicks to add markers to map
let clicks = turf.featureCollection([]);

// A list to track clicks
let clickRoute = [];

// Initialize a map with the center being a view of Ireland
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-7.266155, 53.75014],
  zoom: 9,
}); // map variable

// Create search field for location (i.e. geocoder)
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "country,region,place,postcode,locality,neighborhood,address,poi",
});

// Add geocoder to div
geocoder.addTo("#geocoder");

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
  alert("Couldn't find your current location", "warning", "noCurrentLocationAlert");
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

// function that updates the route-points layer to add maker to map
function addMarker(clicks) {
  map.getSource("route-points").setData(clicks);
}

// if the first and last value is the same in clickRoute and looped route in unchecked remove the looped route
// else loop the route by adding first maker value to the end of clickRoute and remove if unticked
function loopedRoute() {
  if (
    clickRoute[0] == clickRoute[clickRoute.length - 1] &&
    document.getElementById("looped-route").checked == false
  ) {
    clickRoute.pop();
  } else {
    clickRoute.push(clickRoute[0]);
  }

  // Create the route with updated clickRoute
  createRoute(clickRoute);
}

// create a route with an array of lat, long values
// route = [[long1, lat1], [long2, lat2], ... [longn, latn]]
// where n is up to 24
// and latn and longn are floats with up 6 decimal places (e.g. [-7.266155, 53.750145])
async function createRoute(route) {
  // create url to make request with route and API key
  let url =
    "https://api.mapbox.com/directions/v5/mapbox/walking/" +
    route.join(";") +
    "?geometries=geojson&access_token=" +
    mapboxgl.accessToken;

  // Create GET request to Mapbox directions API and recieve data back to get route routeGeoJSON and distance to update map with
  $.ajax({
    method: "GET",
    url: url,
  }).done(function (data) {
    console.log(data);
    // Create a GeoJSON feature collection containing the route
    let route = data.routes[0].geometry.coordinates;
    let routeGeoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // show that route on map using routeGeoJSON
    map.getSource("route").setData(routeGeoJSON);
    // Grab distance of the route from data
    let distance = data.routes[0].distance / 1000;
    // Update distance in HTML
    document.getElementById("distance").innerHTML = distance.toFixed(2) + "km";
  });
}

// Load the map on when the page has loaded
map.on("load", function () {
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
  map.addLayer({
    id: "route-points",
    type: "symbol",
    source: {
      data: clicks,
      type: "geojson",
    },
    layout: {
      "icon-allow-overlap": false,
      "icon-ignore-placement": true,
      "icon-image": "marker-15",
    },
  });

  // create a source to add to for the route but
  // initially set to nothing
  map.addSource("route", {
    type: "geojson",
    data: placeholder,
  });

  // Add a layer to the map to represent the route
  // giving 'route' as the source data
  map.addLayer(
    {
      id: "routeline-active",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12],
      },
    },
    "waterway-label"
  );
});

// When map is clicked collect lat and lng and update map accordingly
map.on("click", function (e) {
  // enable undo button on map when first marker is set
  document.getElementById("undo").disabled = false;

  // Collect lat and long values from click and set as an array 
  let coords = e.lngLat;
  let click = [
    parseFloat(coords.lng.toFixed(6)),
    parseFloat(coords.lat.toFixed(6)),
  ];

  // if there are two markers in route enable the looped route check box
  if (clickRoute.length > 1) {
    document.getElementById("looped-route").disabled = false;
  }

  // if the limit of 24 clicks hasn't been met
  if (clickRoute.length < 24) {
    // // Add click to route
    // clickRoute.push(click);
    // // update number of clicks in html
    // document.getElementById("way-points").innerHTML = clickRoute.length;
    updateRoute(click);

    // set the click as a geoJSON feature to add to clicks
    let pt = turf.point([click[0], click[1]], {
      orderTime: Date.now(),
      key: Math.random(),
    });

    // if it's the first click
    if (clickRoute.length === 1) {
      // add layer to first click
      setStartMarker(click);
    } else {
      // click added to clicks
      clicks.features.push(pt);
      // add click to route-points layer
      addMarker(clicks);
      // create route of lines
      createRoute(clickRoute);
    }
  } else {
    // throw error saying reached limmit of clicks
    alert("Reached limit of way points");
  }
}); // map on click

function updateRoute(click) {
  // Add click to route
  clickRoute.push(click);
  // update number of clicks in html
  document.getElementById("way-points").innerHTML = clickRoute.length;
}

// Function called by button click to clear everything and clicking route again
function resetRoute() {

  // Empty clickRoute and clicks
  clickRoute = [];
  clicks = turf.featureCollection([]);
  
  // Empty distance output
  document.getElementById("distance").innerHTML = "";
  // empyty layer for starting point marker with placeholder
  map.getSource("starting-point").setData(placeholder);
  // empyty layer for route with empty clicks
  map.getSource("route").setData(clicks);
  // empyty layer for markers with clicks
  addMarker(clicks);
  // disable undo button
  document.getElementById("undo").disabled = true;
  // update number of clicks left
  document.getElementById("way-points").innerHTML = "0";
}

// Function called by button click to remove click from route and update map
function undoClick() {
  // if more the starting point in clickRoute
  if (clickRoute.length > 1) {
    // if there is 2 markers
    if (clickRoute.length == 2) {
      // remove marker
      clickRoute.pop();
      // update route on map and distance dispalyed on html
      map.getSource("route").setData(clicks);
      document.getElementById("distance").innerHTML = "";
    } else {
      // otherwise remove marker and update route
      clickRoute.pop();
      createRoute(clickRoute);
    }
    // remove last click from clicks
    clicks.features.pop();
    // update markers on map
    addMarker(clicks);

    // update number of clicks displayed in html
    document.getElementById("way-points").innerHTML = clickRoute.length;
  } else {

    resetRoute();
  }
}

// If current location can't be found send alert
function errorCurrentLocation2(e) {
  alert("Couldn't find your current location", "warning", "noCurrentLocationAlertForMap");
}

function useCurrentLocAsStart() {
  resetRoute();
  navigator.geolocation.getCurrentPosition(
    setStartMarker,
    errorCurrentLocation2,
    {
      enableHighAccuracy: true,
    }
  );
}



function createStartMarker(start) {
  map
    .getSource("starting-point")
    .setData(turf.featureCollection([turf.point(start)]));
}

function setStartMarker(click) {
  if (click.coords == undefined) {
    createStartMarker(click);
  } else {
    let start = [
      parseFloat(click.coords.longitude.toFixed(6)),
      parseFloat(click.coords.latitude.toFixed(6)),
    ];
    updateRoute(start);
    createStartMarker(start);
    map
    .setCenter(start);
  }
  
}


