/* ---------------------------
  renderer.js:
  All rendering settings and
  canvas rendering functions.
--------------------------- */

/* ------
Rendering settings
------ */

// Tram
var tramDotRadius = 2;
// Tracks
var tracksColor = "#ABB2BF";
var fillStationsColor = "#282C34";
var lineWidthRailway = 1;
var stationRadius = 4;
// Node
var lineWidthNode = 1;
var nodeColor = 'white';
var nodeTextColor = nodeColor;
// Utils
var font = "1em sans-serif";

/* ------
Utils
------ */

function drawText(color, text, x, y){
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
}

/* ------
Render tracks
------ */

function drawAllTracks(){
  for (var i=0; i<nbTrams ; i++){
    var tram = allTrams[i];
    drawTracks(tram);
  }
}// tbd move

function drawTracks(tram){
  drawRailway(tram);
  drawStations(tram);
  drawName(tram);
}

function drawRailway(tram){
  var nbStations = tram.getNbStations();
  ctx.moveTo(tram.path[0].x, tram.path[0].y);
  ctx.strokeStyle = tracksColor;
  ctx.lineWidth = lineWidthRailway;
  ctx.lineTo(tram.path[nbStations -1].x, tram.path[nbStations -1].y);
  ctx.stroke();
}

function drawStations(tram){
  var nbStations = tram.getNbStations();
  for (var i=0 ; i<nbStations ; i++){
    ctx.beginPath();
    ctx.arc(tram.path[i].x, tram.path[i].y, stationRadius, 0, 2*Math.PI);
    ctx.strokeStyle = tracksColor;
    ctx.fillStyle = fillStationsColor;
    ctx.fill();
    ctx.stroke();
  }
}

function drawName(tram){
  drawText(tram.color, tram.name, tram.path[0].x -60, tram.path[0].y +4);
}

/* ------
Render tram
------ */

function drawAllTrams(){
  for (var i=0 ; i<nbTrams ; i++){
    drawTram(allTrams[i]);
  }
}// tbd move

function drawTram(tram){
  // The tram is drawn as a point.
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
}

/* ------
Render node
------ */

function drawNode(){
  // Need:
  // nodePosition
  // nbTrams
  // Tram y position
  // var height = nbTrams*distanceBetweenTramTracks;
  var yFirstTram = allTrams[0].path[0].y;
  var yLastTram = allTrams[allTrams.length - 1].path[0].y;
  var rectangleWidth = stationRadius*5;
  var rectangleHeight = yLastTram - yFirstTram + rectangleWidth;

  var startingPoint = {
    x: node.x - (rectangleWidth/2),
    y: yFirstTram - (rectangleWidth/2)
  }
  ctx.rect(startingPoint.x, startingPoint.y, rectangleWidth, rectangleHeight);
  ctx.lineCap = 'round';
  ctx.strokeStyle = nodeColor;
  ctx.lineWidth = lineWidthNode;
  ctx.stroke();

  drawText(nodeTextColor, "Cross", startingPoint.x -8, startingPoint.y -10);
}
