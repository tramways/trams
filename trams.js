var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*alert("ctx: " + ctx);*/

var stationToStationDuration = 200;
var haltDuration = 500;
var tramDotRadius = 8;

var lineWidth = 6;
ctx.lineWidth = lineWidth;

var collisionPointCoordinates = [200, 200]

var tramA = {
  path: [
    [10, 10],
    collisionPointCoordinates,
    [700, 700]
  ],
  color: 'red',
  currentHaltState: 0,
  position: {
    x: 10,
    y: 10
  }
};

var tramB = {
  path: [
    [10, 200],
    collisionPointCoordinates,
    [700, 500]
  ],
  color: 'blue',
  currentHaltState: 0,
  position: {
    x: 10,
    y: 200
  }
};

var tramC = {
  path: [
    [10, 400],
    collisionPointCoordinates,
    [700, 1000]
  ],
  color: 'green',
  currentHaltState: 0,
  position: {
    x: 10,
    y: 400
  }
};

var allTrams = [tramA, tramB, tramC];


function drawTram(tram){
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
  tram.position.x += 20;
  tram.position.y += 20;
}

var myVar = setInterval(function(){ drawTram(tramA) }, 500);



function drawTramPath(tram, myIterator){
  ctx.beginPath();
  ctx.strokeStyle = "grey";
  // path[myIterator -1]
  var previousPosition = tram.path[0];
  var nextPosition = tram.path[1];
  ctx.moveTo(previousPosition[0], previousPosition[1]);//init context
  ctx.lineTo(nextPosition[0], nextPosition[1]);//actually move the tram
  ctx.stroke();
// drawStops
  /*ctx.beginPath();
  ctx.strokeStyle = 'blue';
  var previousPositionB = [0, 0];
  var nextPositionB = [400, 500];
  ctx.moveTo(previousPositionB[0], previousPositionB[1]);//init context
  ctx.lineTo(nextPositionB[0], nextPositionB[1]);//actually move the tram
  ctx.stroke();*/

  // tram is considered a point!!
}

// drawTramPath(tramA);


function drawAllTrams(){
  var numTrams = allTrams.length;
  for (var i=0 ; i<numTrams ; i++){
    drawTram(allTrams[i]);
  }
}

function drawAllTramPaths(){
  // each second
  // for all trams
  // if tram isAllowedToGo
  // stop at stations: 3s
  // go
  // iterator on each tram
  // else wait()
  var numTram = allTrams.length;
  for (var i=0; i<numTram ; i++){
    var tram = allTrams[i];
    drawTramPath(tram);
    tram.currentHaltState ++;
  }
}

function wouldCollide(){
  // is there a risk of collision?
  // am I in priority?
  // what if same?
}

drawAllTramPaths();
drawAllTrams();

// setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, stationToStationDuration);

// Step 0: Make a plan
// Step 1: Graphically render tram paths (also good for debug)
// Finally animate lines (http://stackoverflow.com/questions/23939588/how-to-animate-drawing-lines-on-canvas)
// Use real distances
