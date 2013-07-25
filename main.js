var svgMouseMove = function() {
  var m = d3.mouse(this);

  var line = d3.svg.line()
    .interpolate(interpolateSankey)
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  var data = [{"x": 0, "y": 200}, {"x": m[0], "y": m[1]}];
  
  path.datum(data).attr('d', line);

};

var width = 960, height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = svg.append('path')
              .attr('class', 'line');
              
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

svg.on('mousemove', svgMouseMove);