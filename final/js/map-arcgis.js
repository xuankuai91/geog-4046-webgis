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
            id: "159d275b250b4db1978a728bd20fa2ec"
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
