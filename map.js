google.maps.visualRefresh = true;

var origin = 'hanoi';
var destination = 'ho chi minh city';
var waypoints = [
  { location: 'da lang, vietnam', stopover: true },
  { location: 'nha trang, vietnam', stopover: true },
]; 

// = [ 
//   { location: 'venice', stopover: true },
//   { location: 'prague', stopover: true }, 
//   { location: 'berlin', stopover: true }, 
//   { location: 'amsterdam', stopover: true },
//   { location: 'paris', stopover: true },
//   { location: 'london', stopover: true }   
// ];
var mapType = google.maps.MapTypeId.ROADMAP;
var travelMode = google.maps.TravelMode.DRIVING;

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