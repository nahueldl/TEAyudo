const co = require('co');
const generate = require('node-chartist');
const estadisticaDAO = require('../persistence/estadisticaDAO');

co(function * () {

  // options object
  const options = {width: 400, height: 200};
  const data = {
    labels: ['a','b','c','d','e'],
    series: [
      [1, 2, 3, 4, 5],
      [3, 4, 5, 6, 7]
    ]
  };
  const bar = yield generate('bar', options, data); //=> chart HTML


  // options function
  const options = (Chartist) => ({width: 400, height: 200, axisY: { type: Chartist.FixedScaleAxis } });
  const data = {
    labels: ['a','b','c','d','e'],
    series: [
      [1, 2, 3, 4, 5],
      [3, 4, 5, 6, 7]
    ]
  };
  const bar = yield generate('bar', options, data); //=> chart HTML

});
