// Set variable to decide whether to use current location
let useCurrentLocation = false;

// An array to hold route of run
let route = [];

function setStartingPoint(start, data) {
  // Create a layer over the map for point
  map.addLayer({
    id: String(start),
    type: "circle",
    source: {
      data: data,
      type: "geojson",
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "white",
      "circle-stroke-color": "#3887be",
      "circle-stroke-width": 3,
    },
  });


}
