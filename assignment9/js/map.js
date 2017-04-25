var mymap = L.map('map').setView([30.448611, -91.125833], 11);

//Display Bus Terminal marker
L.marker([30.4494707, -91.1653838]).addTo(mymap)
	.bindPopup("CATS Terminal").openPopup();

//Set Open Street Map as the base map
var streetBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

//Display CATS System GeoJSON layer on map
$.getJSON("https://opendata.arcgis.com/datasets/04e59ed465fe4a0ab70fdabb9413a94d_0.geojson", function(BusRoute) {
	L.geoJSON(BusRoute, {onEachFeature: createParkPopup,}).addTo(mymap);
});

function createParkPopup(feature, layer) {
	layer.bindPopup(feature.properties.ROUTE_NAME);
}
