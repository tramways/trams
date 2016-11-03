var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*alert("ctx: " + ctx);*/

var lineWidth = 4;
var lineCap = "round";

var tramColorA = 'red';
var tramColorB = 'green';
var tramColorC = 'blue';
var unifiedPeriod = 1000;

var pathTramA = [
  [0, 0],
  [200, 200],
  [700, 700]
];

function drawTramPath(tramColor){
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = tramColor;
  ctx.moveTo(0,0);
  ctx.lineTo(200, 200);
  ctx.stroke();
}

drawTramPath(tramColorA);

setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, unifiedPeriod);

// Step 0: Make a plan
// Step 1: Graphically render tram paths (also good for debug)
