require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/FeatureLayer",
	"esri/renderers/SimpleRenderer",
	"esri/symbols/SimpleFillSymbol",
	"dojo/domReady!"
	],

	function( Map, MapView, FeatureLayer, SimpleRenderer, SimpleFillSymbol ){
		var view_2d

		create_2dView();

		function create_2dView() {
			var map = new Map({
				basemap: "streets"
			});

			view_2d = new MapView({
				container: "map",
				map: map,
				zoom: 11,
				center: [-91.1, 30.5]
			});

			var featureLayer = new FeatureLayer({
				url: "https://maps.brla.gov/gis/rest/services/Governmental_Units/ZIP_Code/MapServer",
			});

			map.add(featureLayer);
		}
	});
