var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var haltDuration = 500;
var tramDotRadius = 8;

var lineWidth = 3;
ctx.lineWidth = lineWidth;

var distanceBetweenStations = canvasWidth/10;
var paddingCanvas = canvasWidth/10;
var distanceBetweenTramTracks = 40;

/*var tramA = {
  // path is an araw of objects
  // path[i].x
  path: [{
      x: 100,
      y: 300
    },{
        x: 200,
        y: 300
    },{
      x: 300,
      y: 300
    }, {
      x: 400,
      y: 300
    },{
      x: 500,
      y: 300
    },{
      x: 600,
      y: 300
    },{
      x: 700,
      y: 300
    },{
      x: 800,
      y: 300
    }
  ],
  color: 'red',
  stationsDone: 0
};*/



var tramA = {
  // path is an araw of objects
  // path[i].x
  name: "Tramway A",
  path: [],
  color: 'red'
  //,
  //stationsDone: 0
};

var tramB = {
  // path is an araw of objects
  // path[i].x
  name: "Tramway B",
  path: [],
  color: 'blue'
  //,
  //stationsDone: 0
};

var tramC = {
  // path is an araw of objects
  // path[i].x
  name: "Tramway C",
  path: [],
  color: 'green'
  //,
  //stationsDone: 0
};

// how to make it robust?? ie how to make it so, that the node is always on the
// path  (and forbidden if not on path)
// Take a tram
// Say 'that Y will be a node'
// Use this coordinate for all trams


var allTrams = [tramA, tramB, tramC];
var x = canvasWidth/2;

var node = {
  x: x,
  trams: allTrams
};

function getMaxNumberOfStationsBeforeNode(){
  var availableHorizontalSpace = Math.abs(node.x - paddingCanvas);
  var maxNumber = Math.floor(availableHorizontalSpace/distanceBetweenStations);
  return maxNumber;
}

function getMaxNumberOfStationsAfterNode(){
  var availableHorizontalSpace = (canvasWidth - node.x) - paddingCanvas;
  var maxNumber = Math.floor(availableHorizontalSpace/distanceBetweenStations);
  return maxNumber;
}

function getRandomNumberOfStationsAfterNode(){
  var min = 1;
  var max = getMaxNumberOfStationsAfterNode();
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumberOfStationsBeforeNode(){
  var min = 1;
  var max = getMaxNumberOfStationsBeforeNode();
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateAllTramPaths(){
  var numTrams = allTrams.length;
  for (var tramIndex=0 ; tramIndex<numTrams; tramIndex++){
    generateTramPath(tramIndex, allTrams[tramIndex]);
  }
}

function generateTramPath(tramIndex, tram){
  // H: tram always crosses
  // if tram doesn't cross, don't show it!!! simple :)
  var yPosition = (tramIndex*distanceBetweenTramTracks) + paddingCanvas;
  var stationsBefore = getRandomNumberOfStationsBeforeNode();
  var stationsAfter = getRandomNumberOfStationsAfterNode();

  tram.path.push({x: node.x, y: yPosition});

  for (var i=1 ; i<=stationsBefore ; i++){
    tram.path.unshift({x: node.x - i*distanceBetweenStations, y: yPosition});
  }
  for (var j=1 ; j<=stationsAfter ; j++){
    tram.path.push({x: node.x + j*distanceBetweenStations, y: yPosition});
  }
}

// Is it OK to use a callback???

var nodes= [node];
  // lines: all
  // position: xxx
  // then place the lines accordingly
  // stops before node
  // stops after nodes


function drawNode(){
  var yFirstTram = allTrams[0].path[0].y;
  var yLastTram = allTrams[allTrams.length - 1].path[0].y;

  var rectangleWidth = tramDotRadius*2.4;
  var rectangleHeight = yLastTram - yFirstTram + rectangleWidth;

  var startingPoint = {
    x: node.x - (rectangleWidth/2),
    y: yFirstTram - (rectangleWidth/2)
  }
  ctx.beginPath();
  ctx.moveTo(startingPoint.x, startingPoint.y);
  ctx.lineTo(startingPoint.x + rectangleWidth, startingPoint.y);
  ctx.lineTo(startingPoint.x + rectangleWidth, startingPoint.y + rectangleHeight);
  ctx.lineTo(startingPoint.x, startingPoint.y + rectangleHeight);
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.closePath();
  ctx.stroke();
}



function drawTram(tram){
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
  tram.previousPosition.x = tram.position.x;
  tram.previousPosition.y = tram.position.y;
  tram.position.x += 2;
  tram.position.y += 2;
}

function goToNextStation(tram){
  // while position is not reached
  var myInterval = setInterval(function(){ drawTram(tram) }, 25);
  // when the tram has reached i
  if (tram.position.x > 210){
    alert("wh");
    clearInterval(myInterval);
  }
}

function regularStop(tram){
  currentHaltState++;
}


function drawTracks(tram){
  // ctx.beginPath();
  //ctx.strokeStyle = "grey";
  // path[myIterator -1]
  //var previousPosition = tram.path[0];
  //var nextPosition = tram.path[1];
  ctx.moveTo(tram.path[0].x, tram.path[0].y);//init context

  var nbStops = tram.path.length;
  for (var i=0 ; i<nbStops ; i++){
    //ctx.beginPath();
    ctx.strokeStyle = "slategrey";
    ctx.lineTo(tram.path[i].x, tram.path[i].y);
    ctx.stroke();
  }

  for (var i=0 ; i<nbStops ; i++){
    ctx.beginPath();
    ctx.arc(tram.path[i].x, tram.path[i].y, 4, 0, 2*Math.PI);
    ctx.fillStyle = '#282C34';
    ctx.fill();
    ctx.stroke();
  }


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

function drawAllTracks(){
  var numTram = allTrams.length;
  for (var i=0; i<numTram ; i++){
    var tram = allTrams[i];
    drawTracks(tram);
    //tram.currentHaltState ++;
  }
}


function drawAllDots(){
  var numTrams = allTrams.length;
  for (var i=0 ; i<numTrams ; i++){
    drawTram(allTrams[i]);
  }
}

function wouldCollide(){
  // is there a risk of collision?
  // am I in priority?
  // what if same?
}

function continuePath(tram){
  if(checkAllowed(tram)){
    // go to next station
  }else{
    // wait
  }
}

function checkAllowed(tramA){
  return true;
  // if ((tramA.path[stationsDone +1].isNode
  // check number
}

generateAllTramPaths();
drawAllTracks();// how can i be sure???
drawNode();



// generateAllTramPaths(drawAllTracks);



//drawAllDots();
//continuePath(tramA);
//goToNextStation(tramA);

// setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, stationToStationDuration);
