// API Key
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Vhbi1tZWFkZSIsImEiOiJja3lmeDZkM3Iwc21hMm9xcG95YnFqaHh3In0.p4oU6PP7a92U1JYLBCLG2g";

// an empty geoJSON feature collection for place holder
let placeholder = turf.featureCollection([]);

// a geoJSON feature collection to track clicks to add markers to map
let clicks = turf.featureCollection([]);

// A list to track clicks (if in click route mode)
let clickRoute = [];

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
  types: "country,region,place,postcode,locality,neighborhood,address,poi",
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

function loopedRoute() {
  if (clickRoute[0] == clickRoute[clickRoute.length-1]) {
    clickRoute.pop();
  } else {
    clickRoute.push(clickRoute[0]);
  }

  createRoute(clickRoute);
}

// create a route with given lat long values
async function createRoute(route) {
  // create url to make request with
  let url =
				'https://api.mapbox.com/directions/v5/mapbox/walking/' +
				route.join(';') +
				'?geometries=geojson&access_token=' +
				mapboxgl.accessToken;

			$.ajax({
				method: 'GET',
				url: url,
			}).done(function (data) {
        console.log(data);
        // Create a GeoJSON feature collection containing the route
				let route = data.routes[0].geometry.coordinates;
        let routeGeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }};
        // show route on map
				map.getSource('route').setData(routeGeoJSON);
        // Grab distance of route from data
        let distance = data.routes[0].distance / 1000;
        // Update distance
        document.getElementById('distance').innerHTML = (distance).toFixed(2) + "km";
      })
}

// Set first click or current location with starting point symbol
// Create layers of start point and route points when map has loaded:
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
  // for the click route
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

  

  // When map is clicked collect lat and lng
  map.on("click", function (e) {
    let coords = e.lngLat;
    let click = [parseFloat((coords.lng).toFixed(6)), parseFloat((coords.lat).toFixed(6))];

    // Add click to route
    clickRoute.push(click);

    // set the click as a geoJSON feature
    let pt = turf.point([click[0], click[1]], {
      orderTime: Date.now(),
      key: Math.random(),
    });

    // click added to clicks
    clicks.features.push(pt);

    if (clicks.features.length === 1) {
      // add layer to first click
      map
        .getSource("starting-point")
        .setData(turf.featureCollection([turf.point(click)]));
    } else {
      // add click to route-points layer
      addMarker(clicks);
      // create route of lines
      createRoute(clickRoute);
    }
  }); // map on click
  
});

function undoClick() {
  if (clickRoute.length > 2) {
    clickRoute.pop();
    createRoute(clickRoute);
    // click added to clicks
    clicks.features.pop();
    addMarker(clicks);
  } else {
    clickRoute = [];
    // click added to clicks
    clicks = turf.featureCollection([]);
    addMarker(clicks);
    // show route on map
    map.getSource('route').setData(clicks);
  }
  
}