/* Goal: When full match between search string and feature:
1. Open tooltip of matched marker
2. Change the matched marker's custom image
*/

L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaiIsImEiOiJjaW43a2hyOXYwMDJrd29semd6bmZha2JuIn0.nE1hjNjGG2rlxm_oMrysyg';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([38.13455657705411, -94.5703125], 4);

//Commented out duplicate code
// var myLayer = L.mapbox.featureLayer().addTo(map);

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

//Add an empty feature layer to the map
var myLayer = L.mapbox.featureLayer().addTo(map);

myLayer.on('layeradd', function(e) {
  var marker = e.layer,
    feature = marker.feature;
  marker.setIcon(L.icon(feature.properties.icon));
  var content = '<h2>' + feature.properties.title + '</h2><p>' + feature.properties.description + '</p>';
  marker.bindPopup(content);
});

myLayer.setGeoJSON(geojson);

// Search by city name
$('#searchByName').keyup(cityMapSearch);

function cityMapSearch() {
  var searchString = $('#searchByName').val().toLowerCase();
  myLayer.setFilter(showCity);

  function showCity(feature) {
    if (feature.properties.cityName == searchString) {
      map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 17);
      myLayer.openPopup();
    } else {
      return feature.properties.cityName
        .toLowerCase()
        .indexOf(searchString) !== -1;
    }
    return true;
  }

}
