var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*alert("ctx: " + ctx);*/



var lineWidth = 4;
var lineCap = "round";

var tramColorA = 'red';
var tramColorB = 'green';
var tramColorC = 'blue';
var unifiedPeriod = 1000;

ctx.lineWidth = lineWidth;

var pathTramA = [
  [0, 0],
  [200, 200],
  [700, 700]
];

var tramA = {
  path: [
    [0, 0],
    [200, 200],
    [700, 700]
  ],
  color: 'red'
};

function drawTramPath(tram){
  ctx.beginPath();
  ctx.strokeStyle = tram.color;
  var previousPosition = [0, 0];
  var nextPosition = [200, 200];
  ctx.moveTo(previousPosition[0], previousPosition[1]);//init context
  ctx.lineTo(nextPosition[0], nextPosition[1]);//actually ove the tram
  ctx.stroke();
  // At every period, continue the path
}

drawTramPath(tramA);

setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, unifiedPeriod);

// Step 0: Make a plan
// Step 1: Graphically render tram paths (also good for debug)
