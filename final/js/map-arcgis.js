function main() {
  require(
    [
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/views/SceneView", 
      "esri/portal/PortalItem", 
      "esri/WebScene",
      "dojo/domReady!"
    ],

    function(Map, MapView, FeatureLayer, SceneView, PortalItem, WebScene) {
      create_3dView();
      
      // Create 3D View from scene
      function create_3dView() {
        var scene = new WebScene({
          portalItem: {
            id: "5aaa18c88ef54988a0ad732a38bf12cb"
          }
        });

        var view = new SceneView({
          map: scene,
          container: "globe"
        })
      }
    }
  );
};

$(document).ready(main);
