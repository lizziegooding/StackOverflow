/* Goal: When full match between search string and feature:
1. Open tooltip of matched marker
2. Change the matched marker's custom image
*/

L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaiIsImEiOiJjaW43a2hyOXYwMDJrd29semd6bmZha2JuIn0.nE1hjNjGG2rlxm_oMrysyg';

//Create map object, set base tiles and view
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([38.13455657705411, -94.5703125], 4);

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

// var markers = [];

//Create an empty feature layer
var myLayer = L.mapbox.featureLayer()
//When new layer is added to the map, add custom tooltips and set the custom icon
//In this case, e is the layer that was added (LayerEvent)
.on('layeradd', function(e) {
  //Marker is the layer with the 3 point features
  var marker = e.layer,
  //Feature is each of the point features individually
    feature = marker.feature;
  marker.setIcon(L.icon(feature.properties.icon));
  marker.bindPopup(feature.properties.cityName);
  // markers = marker;
  // this.eachLayer(function(marker) {markers.push(marker); });
})
//Populate feature layer with geojson data
.setGeoJSON(geojson)
//Add feature layer to the map
.addTo(map);

// map.featureLayer.on('ready', function(e){
//   var markers = [];
//   this.eachLayer(function(marker) {markers.push(marker); });
//   // console.log(markers);
// });

$('#search').keyup(search);

// Compare the 'cityName' property of each marker
// to the search string, seeing whether the former contains the latter.
function search() {
    // get the value of the search input field
  var searchString = $('#search').val().toLowerCase();
  myLayer.setFilter(function(feature){
    if (feature.properties.cityName === searchString) {
      map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 17);
      console.log(feature);
      // return true;
      // cycle(markers);
      myLayer.openPopup();
    }

    //return features whose city name is contained within the search string
    return feature.properties.cityName
      .toLowerCase()
      .indexOf(searchString) !== -1;
  });
}

// map.featureLayer.on('ready', function(e) {
  // map.featureLayer.eachLayer(function(layer) {
  //   layer.openPopup();
  // });
// });

function cycle(markers) {
  var i = 0;
  function run() {
    if (++i > markers.length - 1) i = 0;
    map.setView(markers[i].getLatLng(), 12);
    markers[i].openPopup();
    window.setTimeout(run, 3000);
  }
  run();
}
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
