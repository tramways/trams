var haltDuration = 2000;
var tramDotRadius = 6;
var stationRadius = 4;

var tracksColor = "#555b67";

var lineWidth = 3;
ctx.lineWidth = lineWidth;

var distanceBetweenStations = Math.floor(canvasWidth/10);
var paddingCanvas = Math.floor(canvasWidth/10);
var distanceBetweenTramTracks = Math.floor(canvasWidth/20);

var tramA = {
  name: "Tramway A",
  color: 'red',
  nbPassengers: "123",
  defaultPriority: 1,
  path: [],
  // path is an array of objects: path[i].x
  previousStation: 0,
  currentStationIndex: 0,
  position:{
    x:0,
    y:0
  }
  //stationsDone: 0
};

var tramB = {
  name: "Tramway B",
  color: 'blue',
  nbPassengers: "80",
  defaultPriority: 2,
  path: [],
  previousStation: 0,
  currentStationIndex: 0,
  position:{
    x:0,
    y:0
  }
};

var tramC = {
  name: "Tramway C",
  color: 'green',
  nbPassengers: "67",
  defaultPriority: 3,
  path: [],
  previousStation: 0,
  currentStationIndex: 0,
  position:{
    x:0,
    y:0
  }
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

  tram.position={
    x: tram.path[0].x,
    y: tram.path[0].y
  };
}

// Is it OK to use a callback???

var nodes= [node];
  // lines: all
  // position: xxx
  // then place the lines accordingly


function drawNode(){
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
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawTram(tram){
  // The tram is drawn as a point.
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  console.log("dra: " + tram.name + " " + tram.position.x);
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
  /*tram.previousPosition.x = tram.position.x;
  tram.previousPosition.y = tram.position.y;*/
  /*tram.position.x += 2;
  tram.position.y += 2;*/
}

function goToNextStation(tram){

  if (checkIfCanGo(tram)){

    var nextStationIndex = tram.previousStation + 1;
    var nextStationPosition = tram.path[nextStationIndex];
    var myInterval = setInterval(function(){
      if (tram.position.x < nextStationPosition.x){
        drawTram(tram);
        tram.position.x += 1;
        tram.position.y += 0;
      }else if (tram.position.x === nextStationPosition.x){
        drawTram(tram);
        clearInterval(myInterval);
        tram.previousStation++;
        //freezes for 2 sec


        //tram.position.x = nextStationPosition.x;
        //tram.previousStation +=1;
        //regularStop(tram);
      }
    }, 25);

    /*if (tram.position.x >= nextStationPosition.x){
      clearInterval(myInterval);
    }*/

    /*tram.position.x = nextStationPosition.x;
    tram.position.y = nextStationPosition.y;*/

    /*tram.position.x += 2;
    tram.position.y += 2;*/

    //drawTram(tram);
    //regularStop(tram);
    //nextStationIndex++;
  }


}

function regularStop(tram){
  //alert(tram.name + ": " + tram.path[tram.previousStation + 1].x);
  setTimeout(goToNextStation(tram), 1000);
}

function goAndStop(tram){

  //goToNextStation(tram);
  //setTimeout(function(){goToNextStation(tram);}, 4000);
  var nextStationIndex = tram.previousStation + 1;
  var nextStationPosition = tram.path[nextStationIndex];
  while(tram.position.x < nextStationPosition.x){
    tram.position.x += 5;
    console.log("updated");
    tram.position.y += 0;
    drawTram(tram);
  }
}

function checkIfCanGo(tram){
  //alert("can go");
  // for all trams, is the next station a node for one of them?
  return true;
}


function drawTracks(tram){
  ctx.moveTo(tram.path[0].x, tram.path[0].y);
  //init context

  var nbStops = tram.path.length;
  for (var i=0 ; i<nbStops ; i++){
    ctx.strokeStyle = tracksColor;
    ctx.lineTo(tram.path[i].x, tram.path[i].y);
    ctx.stroke();
  }

  for (var i=0 ; i<nbStops ; i++){
    ctx.beginPath();
    ctx.arc(tram.path[i].x, tram.path[i].y, stationRadius, 0, 2*Math.PI);
    ctx.fillStyle = '#282C34';
    ctx.fill();
    ctx.stroke();
  }

  tram.position = {
    x: tram.path[0].x,
    y: tram.path[0].y
  }
}

function drawAllTracks(){
  var numTram = allTrams.length;
  for (var i=0; i<numTram ; i++){
    var tram = allTrams[i];
    drawTracks(tram);
  }
}


function drawAllTrams(){
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
drawAllTracks();// how can i be sure??? callback?
drawNode();
/*var myInterval = setInterval(function(){
  drawTram(tramA);
}, 100);*/

//drawAllTrams();

setTimeout(function(){
    goAllTheWay(tramA);
    goAllTheWay(tramB);
    goAllTheWay(tramC);
}, 500);

/*function stopAndGoToNextStation(tram){
  var stopDuration = 1000;
  setTimeout(function(){
    goToNextStation(tram); // needs to be wrapped (closure) otherwise is invoked immediately
  }, stopDuration);
}*/


function goAllTheWay(tram){
    var vx = 1;
    var vy = 0;
    var myInt = setInterval(function(){
      if(isAtAStation(tram)){
        haltAtStation(tram);
        if (isAtLastStation(tram)){
          clearInterval(myInt);
        }
      }else{
        tram.position.x += vx;
        tram.position.y += vy;
      }
      drawTram(tram);
    }, 1000/20);
}


function isAtLastStation(tram){
  return false;
}

function isAtAStation(tram){
  var xPositionOfStations = [];
  for (var i=0 ; i<tram.path.length; i++){
    xPositionOfStations.push(tram.path[i].x);
  }
  var k = xPositionOfStations.indexOf(tram.position.x);
  if (k > -1){
    return true;
  }else{
    return false;
  }
}

function haltAtStation(tram){
  setTimeout(function(){
    tram.position.x += 1;
  }, haltDuration);
}


/*function go(){
  //while(tramA.position.x < tramA.path[tramA.path.length - 1].x){
  while(tramA.currentStationIndex < tramA.path.length){
    console.log("yo");
    drawTram(tramA);
    //tramA.position.x = tramA.path[tramA.path.length - 1].x;

    tramA.currentStationIndex++;
    tramA.position.x = tramA.path[tramA.currentStationIndex].x;
    tramA.position.y = tramA.path[tramA.currentStationIndex].y;
  }
}*/
/*setTimeout(function(){
  while(tramA.position.x < tramA.path[tramA.path.length - 1].x){
    console.log("yo");
    drawTram(tramA);
    tramA.position.x += 80;
    setTimeout(function(){}, 1000);
  }
}, 800);*/

// tram is considered a point!!

// setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, stationToStationDuration);
