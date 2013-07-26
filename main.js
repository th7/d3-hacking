var onScroll = function(e) {
  update();
};

var update = function(data) {
  var divs = $('.photo-container');
  startCoords = [];
  endCoords = [];
  var data = [];
  for (var i = 0; i < divs.length; i++) {
    $div = $(divs[i]);
    startCoords.push(
      {"y": $div.offset().top + $div.height() / 2 - $(window).scrollTop(),
       "x": $div.offset().left + $div.width() - $(window).scrollLeft()});

    $elem = $('#gmimap' + i).prev();
    endCoords.push({"y": $elem.offset().top + $elem.height() - $(window).scrollTop(),
       "x": $elem.offset().left + $elem.width() / 2 - $(window).scrollLeft()});
  }
  
  // Create the line endpoints
  for (var i = 0; i < startCoords.length; i++) {
    data.push ([startCoords[i], endCoords[i]]);
  }


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

setTimeout(update, 1000);
