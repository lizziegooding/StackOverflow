/* Goal: When full match between search string and feature:
1. Open tooltip of matched marker
2. Change the matched marker's custom image
*/

L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaiIsImEiOiJjaW43a2hyOXYwMDJrd29semd6bmZha2JuIn0.nE1hjNjGG2rlxm_oMrysyg';

//Create map object, set base tiles and view
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([38.13455657705411, -94.5703125], 4);

//Create an empty feature layer and add it to the map
var myLayer = L.mapbox.featureLayer().addTo(map);

//Define GeoJSON data
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      id: 1,
      'title': 'Washington, D.C.',
      'description': 'In the District of Columbia',
      'cityName': 'washington',
      'icon': {
        'iconUrl': 'https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png',
        'iconSize': [50, 50],
        'iconAnchor': [25, 25],
        'popupAnchor': [0, -25],
        'className': 'dot'
      }
    },
    geometry: {
      type: 'Point',
      coordinates: [-77.03201, 38.90065]
    }
  },

    {
      type: 'Feature',
      properties: {
        id: 2,
        'title': 'Chicago, M',
        'description': 'In Illinois',
        'cityName': 'chicago',
        'icon': {
          'iconUrl': 'https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png',
          'iconSize': [50, 50],
          'iconAnchor': [25, 25],
          'popupAnchor': [0, -25],
          'className': 'dot'
        }
      },
      geometry: {
        type: 'Point',
        coordinates: [-87.71484375, 41.80407814427234]
      }
    },

    {
      type: 'Feature',
      properties: {
        id: 3,
        'title': 'Dallas, T',
        'description': 'In Texas',
        'cityName': 'dallas',
        'icon': {
          'iconUrl': 'https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png',
          'iconSize': [50, 50],
          'iconAnchor': [25, 25],
          'popupAnchor': [0, -25],
          'className': 'dot'
        }
      },
      geometry: {
        type: 'Point',
        coordinates: [-96.85546875, 32.80574473290688]
      }
    }
  ]
};

//Set layer icons populate myLayer with geojson data
myLayer.on('layeradd', function(e) {
  var marker = e.layer,
    feature = marker.feature;
  marker.setIcon(L.icon(feature.properties.icon));
});
myLayer.setGeoJSON(geojson);

// Compare the 'cityName' property of each marker to the search string, seeing whether the former contains the latter.
function search() {
  //Get the value of the search input field
  var searchString = $('#search').val().toLowerCase();

  //Set filter needs to be declared first
  myLayer.setFilter(function(feature){
    //Return features whose city name contains the search string
    return feature.properties.cityName
      .toLowerCase()
      .indexOf(searchString) !== -1;
  });

  //Loop through each layer
  myLayer.eachLayer(function(marker) {
    //If user search input matches the feature's city name
    if (marker.feature.properties.cityName === searchString) {
      //Update icon url
      marker.setIcon(L.icon({iconUrl: 'https://www.mapbox.com/jobs/img/astro3.svg'}));
      //Zoom in and center on matching feature
      map.setView([marker.feature.geometry.coordinates[1], marker.feature.geometry.coordinates[0]], 17);
      //Open feature popup
      marker.openPopup();
    }
  });
}

//Event listener for user keyup within search field
$('#search').keyup(search);
