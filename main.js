var onScroll = function(e) {
  var divs = $('.photo-container');
  startCoords = []
  for (var i = 0; i < divs.length; i++) {
    $div = $(divs[i]);
    startCoords.push(
      {"y": $div.offset().top + $div.height() / 2 - $(window).scrollTop(),
       "x": $div.offset().left + $div.width() - $(window).scrollLeft()});
  }
  
  var data = [[startCoords[0], {"x": 705, "y": 95}], [startCoords[1], {"x": 810, "y": 250}], [startCoords[2], {"x": 825, "y": 252}], [startCoords[3], {"x": 827, "y": 454}]];
  update(data);
};

var svgMouseMove = function() {
  var m = d3.mouse(this);

  var data = [[startCoords[0], {"x": m[0], "y": m[1]}], [startCoords[1], {"x": m[0], "y": m[1]}], [startCoords[2], {"x": m[0], "y": m[1]}]];
  update(data);
};

var update = function(data) {
  var line = d3.svg.line()
    .interpolate(interpolateSankey)
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  var path = svg.selectAll('path').data(data);

  path.attr('d', line);

  // path.enter().append('path')
  //     .attr('class', 'line')
  //     .attr('d', line);

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