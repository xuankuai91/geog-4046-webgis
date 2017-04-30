function main() {
  // Create a layer of cities
  var baker = L.marker([30.585556, -91.157222]).bindPopup('Baker'),
      batonRouge = L.marker([30.448611, -91.125833]).bindPopup('Baton Rouge'),
      central = L.marker([30.554444, -91.036667]).bindPopup('Central'),
      zachary = L.marker([30.655, -91.156667]).bindPopup('Zachary');

  var cityLayer = L.layerGroup([baker, batonRouge, central, zachary]);

  // Get Open Street Map
  var streetBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  // Get Open Topo Map
  var topoBasemap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create layer objects
  var baseMaps = {
    'OpenStreetMap': streetBasemap,
    'OpenTopoMap': topoBasemap
  };

  var overlayMaps = {
    'Cities': cityLayer
  };

  // Set map
  var myMap = L.map('map', {
    layers: [streetBasemap, cityLayer],
    zoomControl: false
  }).setView([30.51589, -91.080373], 11);

  // Add zoom control with a home button
  var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(myMap);

  // Add "fly to" function
  $('.btn').click(function() {
    var lat = parseFloat($('#lat').val());
    var lon = parseFloat($('#lon').val());

    myMap.flyTo(new L.LatLng(lat, lon));
  });

  // Pan to a specific city
  $('.dropdown-menu li').click(function() {
    var cityKey = $(this).attr('value');

    if (cityKey === 'baker') {
      myMap.panTo(new L.LatLng(30.585556, -91.157222));
    }
    else if (cityKey === 'batonrouge') {
      myMap.panTo(new L.LatLng(30.448611, -91.125833));
    }
    else if (cityKey === 'central') {
      myMap.panTo(new L.LatLng(30.554444, -91.036667));
    }
    else {
      myMap.panTo(new L.LatLng(30.655, -91.156667));
    }
  });
/*
  // Display Bus Terminal marker
  L.marker([30.4494707, -91.1653838]).addTo(myMap)
    .bindPopup('CATS Terminal').openPopup();
*/
  // Create CATS System GeoJSON layer
  var busLayer = L.layerGroup().addTo(myMap);

  $.getJSON('https://opendata.arcgis.com/datasets/04e59ed465fe4a0ab70fdabb9413a94d_0.geojson', function(busRoute) {
    L.geoJSON(busRoute, {
      onEachFeature: createBusLayer,
      style: {'color': '#0F415B'}
    }).addTo(myMap);
  });

  function createBusLayer(feature, layer) {
    busLayer.addLayer(layer);
    layer.bindPopup(feature.properties.ROUTE_NAME);
  }

  overlayMaps['Bus Routes'] = busLayer;

  // Display city limits GeoJSON layer on map
  var cityBoundaryLayer = L.layerGroup().addTo(myMap);

  $.getJSON('https://opendata.arcgis.com/datasets/512cbe96676449019a1de81494465254_0.geojson', function(cityName) {
    L.geoJSON(cityName, {
      onEachFeature: createCityBoundaryLayer,
      style: getStyle
    }).addTo(myMap);
  });

  function createCityBoundaryLayer(feature, layer) {
    cityBoundaryLayer.addLayer(layer);
    layer.bindPopup(feature.properties.CITY_LIMITS_NAME);
  }

  overlayMaps['City Boundaries'] = cityBoundaryLayer;

  // Add layer control
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  // Generate style using random color
  function getRandomColor() {
    var color;
    var r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);

    color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color
  };

  function getColor(cityName) {
    return cityName === 'BAKER' ? getRandomColor() :
           cityName === 'BATON ROUGE' ? getRandomColor() :
           cityName === 'CENTRAL' ? getRandomColor() :
           cityName === 'ZACHARY' ? getRandomColor() :
           getRandomColor();
  }

  function getStyle(feature) {
    return {'color': getColor(feature.properties.CITY_LIMITS_NAME)}
  }
};

$(document).ready(main);
