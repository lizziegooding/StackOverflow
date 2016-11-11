/* Goal: When full match between search string and feature:
1. Open tooltip of matched marker
2. Change the matched marker's custom image
*/

L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaiIsImEiOiJjaW43a2hyOXYwMDJrd29semd6bmZha2JuIn0.nE1hjNjGG2rlxm_oMrysyg';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([38.13455657705411, -94.5703125], 4);

//Commented out duplicate code
// var myLayer = L.mapbox.featureLayer().addTo(map);

//Define and add GeoJSON data
var marker = L.mapbox.featureLayer({
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
}).addTo(map);

//Add custom tooltips and set the custom icon
marker.eachLayer(function(layer){
  layer.bindPopup(layer.feature.properties.cityName);
  layer.setIcon(L.icon(layer.feature.properties.icon));
});

$('#search').keyup(search);

// Compare the 'cityName' property of each marker
// to the search string, seeing whether the former contains the latter.
function search() {
    // get the value of the search input field
  searchString = $('#search').val().toLowerCase();
  marker.setFilter(function(feature){
    //return features whose city name is contained within the search string
    return feature.properties.cityName
      .toLowerCase()
      .indexOf(searchString) !== -1;
  });
};

//Add an empty feature layer to the map
// var myLayer = L.mapbox.featureLayer().addTo(map);
//
// myLayer.on('layeradd', function(e) {
//   var marker = e.layer,
//     feature = marker.feature;
//   marker.setIcon(L.icon(feature.properties.icon));
//   var content = '<h2>' + feature.properties.title + '</h2><p>' + feature.properties.description + '</p>';
//   marker.bindPopup(content);
//   console.log(marker);
  // marker.eachLayer(function(layer) {
  //   layer.openPopup();
  // });
// });

// myLayer.setGeoJSON(geojson);
// myLayer.eachLayer(function(m) {
//   m.openPopup();
// });

// Search by city name
// $('#searchByName').keyup(cityMapSearch);
// myLayer.eachLayer(function(m) {
//   m.openPopup();
// });

// function cityMapSearch() {
//   var searchString = $('#searchByName').val().toLowerCase();
//   myLayer.setFilter(function (feature) {
//     // console.log(feature);
//     if (feature.properties.cityName === searchString) {
//       map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 17);
//       return true;
//     } else {
//       return feature.properties.cityName
//         .toLowerCase()
//         .indexOf(searchString) !== -1;
//     }
//   });
// }
