var onClickOne = function() {
  console.log('onClickOne');
  svg.select('circle').style('fill', 'steelblue');
};

var onClickTwo = function() {
  console.log('onClickTwo');
};

var onClickThree = function() {
  console.log('onClickThree');
};

var onClickFour = function() {
  console.log('onClickFour');
};

var onClickFive = function() {
  console.log('onClickFive');
};

var svg = d3.select('svg');

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