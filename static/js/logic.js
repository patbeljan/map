const API_KEY = "pk.eyJ1IjoicGF0Mzc5NyIsImEiOiJjazJwZTJja2wwM2NlM2ludnd3czM1OXA5In0.lrahJ3PwNfrcgcGc0TW97A";

function markerSize(magnitude) {
  return magnitude * 25000;
}

  function getColor(mag) {
    return mag > 5 ? '#800026' :
           mag > 4  ? '#BD0026' :
           mag > 3  ? '#FC4E2A' :
           mag > 2   ? '#FEB24C' :
           mag > 1   ? '#FED976' :
                      '#2fd12c';
}


var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function createCircles(data){
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  function pointToLayer(feature, latlng){
    return L.circle(latlng, {
      radius: markerSize(feature.properties.mag),
      fillOpacity: 0.85,
      color: getColor(feature.properties.mag),
      fillColor: getColor(feature.properties.mag)
    });
  }

  var earthquakes = L.geoJSON(data, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
};

function createMap(earthquakes){

  var tLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
  });

  var map = L.map("map", {
    center: [39.0473, -95.6752],
    zoom: 4,
    layers: [tLayer, earthquakes]
  });

}


d3.json(link, function(data) {
 createCircles(data.features);
// console.log(data.features[0]);
// createMap(data);
});
