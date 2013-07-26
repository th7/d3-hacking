var onScroll = function(e) {
  update();
};

var $photoContainers;
var $gmimaps;

var setup = function() {
  $photoContainers = $('.photo-container');
  $gmimaps = $("[id^=gmimap]")
}

var update = function() {
  var startCoords = [];
  var endCoords = [];
  var data = [];
  for (var i = 0; i < $photoContainers.length; i++) {
    $div = $($photoContainers[i]);

    if ($div.data('map-index') || $div.data('map-index') == "0") {
      var startCoord = 
        {"y": $div.offset().top + $div.height() / 2 - $(window).scrollTop(),
         "x": $div.offset().left + $div.width() - $(window).scrollLeft()};

      // $elem = $('#gmimap' + $div.data('map-index')).prev();
      $elem = $gmimaps.filter('#gmimap' + $div.data('map-index')).prev();
      // debugger;
      var endCoord = {"y": $elem.offset().top + $elem.height() - $(window).scrollTop(),
          "x": $elem.offset().left + $elem.width() / 2 - $(window).scrollLeft()};

      data.push ([startCoord, endCoord]);
    }
  }
  

  var line = d3.svg.line()
    .interpolate(interpolateSankey)
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  var path = svg.selectAll('path').data(data);

  path.attr('d', line);

  path.enter().append('path')
      .attr('class', 'line')
      .attr('d', line);

};


// http://bl.ocks.org/mbostock/3960741
function interpolateSankey(points) {
  var x0 = points[0][0], y0 = points[0][1], x1, y1, x2,
      path = [x0, ",", y0],
      i = 0,
      n = points.length;
  while (++i < n) {
    x1 = points[i][0], y1 = points[i][1], x2 = (x0 + x1) / 2;
    path.push("C", x2, ",", y0, " ", x2, ",", y1, " ", x1, ",", y1);
    x0 = x1, y0 = y1;
  }
  return path.join("");
}                  

var svg = d3.select("svg");
// svg.on('mousemove', svgMouseMove);
window.addEventListener('scroll', onScroll, false);

setTimeout(update, 1500);
setTimeout(setup, 1000)
