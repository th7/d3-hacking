var origin = 'chicago, il';
var destination = 'san francisco, ca';
var waypoints = [ { location: 'seattle, washington', stopover: false } ];
var mapType = google.maps.MapTypeId.SATELLITE;
var travelMode = google.maps.TravelMode.DRIVING;

function initialize() {        
  var elemId = "map-canvas";
  var mapOptions = { mapTypeId: mapType };
  map = new google.maps.Map(document.getElementById(elemId), mapOptions);
  var renderer = new google.maps.DirectionsRenderer({
    markerOptions: { visible: false }
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