google.maps.visualRefresh = true;

var inputs = ['19.687166, 105.501166', '16.238333333, 107.989166667', '16.375666667, 107.719333333', '11.933666667, 108.16'];

var geocoder = new google.maps.Geocoder();

var Place = function(name) {
  this.name = name;
  this.getLatLng();
}

Place.prototype.getLatLng = function() {
  var self = this;
  geocoder.geocode({ address: this.name }, function(result) {
    self.latLng = result[0].geometry.location;
    // self.getPxLoc();
  });
}


// CanvasOverlay.prototype.findPxLocs = function(){
//   var projection = this.prototype.getProjection();
//   Place.prototype.getPxLoc();
// };


// Place.prototype.getPxLoc = function() {
//   this.pxLoc = projection.fromLatLngToContainerPixel(this.latLng);
// }

var places = [];
for(var i=0; i < inputs.length; i++) {
  places.push( new Place(inputs[i]) );
}

var origin = places[0].name;
var destination = places[places.length - 1].name;
var waypoints = [];
for(var i=1; i < places.length - 1; i++) {
  waypoints.push( { location: places[i].name, stopover: true } );
}

var mapType = google.maps.MapTypeId.ROADMAP;
var travelMode = google.maps.TravelMode.DRIVING;

var map;
var projection;


function initialize() { 
  var styles = [
    {
      stylers: [
        { saturation: -70 },
        { gamma: 1.5 }
      ]
    }
  ];
  var elemId = "map-canvas";
  var mapOptions = { 
    mapTypeId: mapType,
    styles: styles,
    disableDoubleClickZoom: true,
    draggable: false,
    keyboardShortcuts: false,
    mapTypeControl: false,
    panControl: false,
    scrollwheel: false,
    streetViewControl: false,
    zoomControl: false
  };
  map = new google.maps.Map(document.getElementById(elemId), mapOptions);
  CanvasOverlay = function() {
    this.setMap(map);
  };
  CanvasOverlay.prototype = new google.maps.OverlayView();
  CanvasOverlay.prototype.onAdd = function() {};
  CanvasOverlay.prototype.onRemove = function() {};
  CanvasOverlay.prototype.draw = function() {};
  overlay = new CanvasOverlay;



  // debugger;
  // CanvasOverlay.findPxLocs();

  renderRoute();
}
function renderRoute() {
  var renderer = new google.maps.DirectionsRenderer({
    draggable: true,
    markerOptions: { 
      visible: true
    },
    polylineOptions: {
      strokeColor: "#000000",
      strokeWeight: 3
    }
  });
  renderer.setMap(map);
  var router = new google.maps.DirectionsService();
  router.route({
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    travelMode: travelMode
  }, function(result, status) {
    renderer.setDirections(result);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addListener(map, 'idle', function() {
  projection = CanvasOverlay.getProjection();
});
