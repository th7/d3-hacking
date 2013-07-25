
// called first in each specific click function
// gets input box data and assigns it to data array
var onClickAny = function() {
  console.log('onClickAny');
  var one = Number(d3.select('#input_one').property('value'));
  var two = Number(d3.select('#input_two').property('value'));
  var three = Number(d3.select('#input_three').property('value'));
  var four = Number(d3.select('#input_four').property('value'));
  var five = Number(d3.select('#input_five').property('value'));

  data = [one, two, three, four, five]
};

// recolor first circle (select vs selectAll)
var onClickOne = function() {
  onClickAny();
  console.log('onClickOne');
  svg.select('circle').style('fill', 'steelblue');
};

// moves circles to random x within svg width
var onClickTwo = function() {
  onClickAny();
  console.log('onClickTwo');
  circles.attr('cx', function() {
    return Math.random() * w;
  })
};

// sets each circle's x to the corresponding data element
var onClickThree = function() {
  onClickAny();
  console.log('onClickThree');
  circles.data(data);
  circles.attr('cx', function(d) {
    return d;
  });
};

var fourRunning = false;
// starts or stops a jenky animation loop
var onClickFour = function() {
  onClickAny();
  console.log('onClickFour');
  
  if (fourRunning) {
    fourRunning = false;
    d3.select(this).text('Run Four');
    return;
  } else {
    d3.select(this).text('Stop');
    fourRunning = true;
  }

  fourRunner();
};
// changes values of data and updates circles
var fourRunner = function() {
  console.log('fourRunner');
  if (!fourRunning) {
    return;
  }

  for (i in data) {
    data[i] = ((data[i] + 10) % w);
  }

  circles.data(data)
         .attr('cx', function(d) {return d})
         .attr('cy', function(d) {return d});

  d3.selectAll('input').data(data).property('value', function(d) {return d});         

  setTimeout(fourRunner, 200);
};

var onClickFive = function() {
  onClickAny();
  console.log('onClickFive');
};


var w = 500;
var h = 500;
// append an svg element to the wrapper, just cause we can
var svg = d3.select('.svg_wrapper').append('svg')
            .attr('width', w)
            .attr('height', h)
            .classed('transparent', true)
            .attr('id', 'svg');

var data = [50, 150, 250, 350, 450];

// svg.selectAll has no hits
//  .data(data) puts all data into 'enter' since no elements
//  .enter gets 'enter' data, .append appends elements for all 'enter' data
//  .attr sets attributes (some according to corresponding data)
var circles = svg.selectAll('circle')
                  .data(data)
                  .enter().append('circle')
                  .attr('cx', function(d) {return d})
                  .attr('cy', function(d) {return d})
                  .attr('r', 12);               

var buttonOne = d3.select('#button_one')
                  .on('click', onClickOne);

var buttonTwo = d3.select('#button_two')
                  .on('click', onClickTwo);

var buttonThree = d3.select('#button_three')
                  .on('click', onClickThree);

var buttonFour = d3.select('#button_four')
                  .on('click', onClickFour);

var buttonFive = d3.select('#button_five')
                  .on('click', onClickFive);