// See answer here: https://stackoverflow.com/questions/40197437/mapbox-gl-directions-events-does-not-fire/40536914#40536914
// User included out of date versions of Mapbox GL JS and Directions API libraries

mapboxgl.accessToken = 'pk.eyJ1IjoicHJheWVyIiwiYSI6ImI3OGRjZjcyY2JiZTUzODMwZWUxZDdiNjRiMWE4NjI5In0.zETX-x6-XPpAv3zt4MiFwg';



var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8'
});


var directions = new mapboxgl.Directions({
  unit: 'metric', // Use the metric system to display distances.
  profile: 'driving', // Set the initial profile to walking.
  container: 'directions' // Specify an element thats not the map container.
});


map.on('load', function() {
  directions.setOrigin([77.5045504332, 13.0386169339]); // On load, set the origin to "Toronto, Ontario".
  directions.setDestination([77.5075504332, 13.0386169339]); // On load, set the destination to "Montreal, Quebec".
});


directions.on('route', function(e) {
  alert("FIRE!")
});
