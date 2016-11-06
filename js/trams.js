// Functional settings
var haltDuration = 2000;
var securityHaltDuration = 3000;

// Graphics settings
var startTimeOut = 2000;
var stationRadius = 4;
var tracksColor = "#ABB2BF";
var fillStationsColor = "#282C34";
var lineWidth = 3;
ctx.lineWidth = lineWidth;
var distanceBetweenStations = Math.floor(canvasWidth/6);
var horizontalPaddingCanvas = Math.floor(canvasWidth/20);
var verticalPaddingCanvas = Math.floor(canvasWidth/10);
var distanceBetweenTramTracks = Math.floor(canvasWidth/10);
var nodeColor = 'white';
var nodeTextColor = nodeColor;

// Trams
var defaultNbPassengers = 0;
var tramA = createTram("A", "#C678DD", defaultNbPassengers);
var tramB = createTram("B", "#61AFEF", defaultNbPassengers);
var tramC = createTram("C", "#EEA45F", defaultNbPassengers);
var allTrams = [tramA, tramB, tramC];
var nbTrams = allTrams.length;

// Node position (= where trams cross)
var xNode = Math.floor(canvasWidth/2);
var node = {
  x: xNode,
  impactedTrams: allTrams
};

function getMaxNbStationsBeforeNode(){
  var availableHorizontalSpace = Math.abs(node.x - horizontalPaddingCanvas);
  var maxNb = Math.floor(availableHorizontalSpace/distanceBetweenStations);
  return maxNb;
}

function getMaxNbStationsAfterNode(){
  var availableHorizontalSpace = (canvasWidth - node.x) - horizontalPaddingCanvas;
  var maxNb = Math.floor(availableHorizontalSpace/distanceBetweenStations);
  return maxNb;
}

function getRandomNbStationsAfterNode(){
  var min = 1;
  var max = getMaxNbStationsAfterNode();
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return 2;
}

function getRandomNbStationsBeforeNode(){
  var min = 1;
  var max = getMaxNbStationsBeforeNode();
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  return 2;
}

function generateAllTramPaths(){
  for (var tramIndex=0 ; tramIndex<nbTrams; tramIndex++){
    resetPath(allTrams[tramIndex]);
    generatePath(tramIndex, allTrams[tramIndex]);
  }
}

function resetPath(tram){
  tram.path=[];
}

function generatePath(tramIndex, tram){
  // H: tram always crosses
  // if tram doesn't cross, don't show it!!! simple :)
  var yPosition = (tramIndex*distanceBetweenTramTracks) + verticalPaddingCanvas;
  var stationsBefore = getRandomNbStationsBeforeNode();
  var stationsAfter = getRandomNbStationsAfterNode();

  tram.path.push({
    x: node.x,
    y: yPosition});

  for (var i=1 ; i<=stationsBefore ; i++){
    tram.path.unshift({x: node.x - i*distanceBetweenStations, y: yPosition});
  }
  for (var j=1 ; j<=stationsAfter ; j++){
    tram.path.push({x: node.x + j*distanceBetweenStations, y: yPosition});
  }

  initializePosition(tram);
}

function initializePosition(tram){
  tram.position = {
    x: tram.path[0].x,
    y: tram.path[0].y
  };
}

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
  ctx.strokeStyle = nodeColor;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = nodeTextColor;
  ctx.font = ".8em sans-serif";
  ctx.fillText("Cross", startingPoint.x -4, startingPoint.y -10);
}

// function drawTram(tram){
//   // The tram is drawn as a point.
//   // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//   ctx.beginPath();
//   ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
//   ctx.fillStyle = tram.color;
//   ctx.fill();
// }



function drawAllTracks(){
  for (var i=0; i<nbTrams ; i++){
    var tram = allTrams[i];
    drawTracks(tram);
  }
}

// function drawTracks(tram){
//   ctx.moveTo(tram.path[0].x, tram.path[0].y);
//   //Initialization context
//
//   var nbStations = tram.path.length;
//
//   ctx.strokeStyle = tracksColor;
//   ctx.lineWidth = 1;
//   ctx.lineTo(tram.path[nbStations -1].x, tram.path[nbStations -1].y);
//   ctx.stroke();
//
//   for (var i=0 ; i<nbStations ; i++){
//     ctx.beginPath();
//     ctx.arc(tram.path[i].x, tram.path[i].y, stationRadius, 0, 2*Math.PI);
//     ctx.strokeStyle = tracksColor;
//     ctx.fillStyle = fillStationsColor;
//     ctx.fill();
//     ctx.stroke();
//   }
//
//   ctx.fillStyle = tram.color;
//   ctx.font = "1em sans-serif";
//   ctx.fillText(tram.name, tram.path[0].x -60, tram.path[0].y +4);
// }


function drawAllTrams(){
  for (var i=0 ; i<nbTrams ; i++){
    drawTram(allTrams[i]);
  }
}

document.getElementById("goButton").onclick = function() {
  //drawAllTrams();
  //e.preventDefault();
  generateAllTramPaths();
  reinitialize();

  drawAllTracks();// how can i be sure??? callback?
  drawNode();

  drawTram(tramA);
  drawTram(tramB);
  drawTram(tramC);

  setTimeout(function(){
      goAllTheWay(tramA);
      goAllTheWay(tramB);
      goAllTheWay(tramC);
  }, startTimeOut);
};

function reinitialize(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //??? works
  initializeTramsNbPassengers();
  initializeTramsPositions();
  initializeIntervals();
}

function initializeIntervals(){
//
}

function initializeTramsNbPassengers(){
  for (var i=0 ; i<nbTrams ; i++){
    var domId = getDOMId(allTrams[i]);
    allTrams[i].nbPassengers = document.getElementById(domId).value;
  }
};


function initializeTramsPositions(){
  for (var i=0 ; i<nbTrams ; i++){
    initializePosition(allTrams[i]);
  }
};

function getDOMId(tram){
  return "nbPassengers" + tram.id;
};

function goAllTheWay(tram){
    var vx = 1;
    var vy = 0;
    var myInt = setInterval(function(){
      if(isAtAStation(tram) && !isAtFirstStation(tram)){
        //tram.nextStationIndex++;
        if (isAtLastStation(tram)){
          clearInterval(myInt);
        }else{
          clearInterval(myInt);
          haltAtStation(tram);
          //goAllTheWay(tram);
          // after halt: go all the way
        }
      }else{
        tram.position.x += vx;
        tram.position.y += vy;
      }
      drawTram(tram);
    }, 10);
    return myInt;
}


function isAtLastStation(tram){
  var lastStationIndex = tram.path.length - 1;
  return getCurrentStationIndex(tram) === lastStationIndex? true:false;
}

function isAtFirstStation(tram){
  return getCurrentStationIndex(tram) === 0? true:false;
}

function isAtAStation(tram){
  return getCurrentStationIndex(tram) > -1? true:false;
}

function getCurrentStationIndex(tram){
  // Only x counts
  var xStations = [];
  for (var i=0 ; i<tram.path.length; i++){
    xStations.push(tram.path[i].x);
  }
  return xStations.indexOf(tram.position.x);
}

function haltAtStation(tram){

  if (isAllowed(tram)){
    setTimeout(function(){
      tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
      goAllTheWay(tram);
    }, haltDuration);
  }else{
    setTimeout(function(){
      haltAtStation(tram);
    }, securityHaltDuration);// will get too much
  }
  /*setTimeout(function(){
    tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
    goAllTheWay(tram);
  }, getHaltDuration(tram));*/

}

function isAllowed(tram){
    return !mustWaitLonger(tram);
}

function getNextStation(tram){
  var currentStationIndex = getCurrentStationIndex(tram);
}

function getCurrentStationIndex(tram){
  // we know it's evaluated when the tram is at a station anyway
  var currentStationIndex = -1;
  var nbStations = tram.path.length;
  for (var i=0 ; i<nbStations ; i++){
    if (tram.path[i].x === tram.position.x && tram.path[i].y === tram.position.y){
      currentStationIndex = i;
    }
  }
  return currentStationIndex;
}

function nextStationIsNode(tram){
  var nextStationIndex = getCurrentStationIndex(tram) + 1;
  return (tram.path[nextStationIndex].x === node.x)? true:false;
}


function mustWaitLonger(tram){
  var mustWaitLonger = false;
  // find out the coordinates
  if (nextStationIsNode(tram)){
    var competitors = getCompetitors(tram);
    if (getCompetitors(tram).length !== 0){
      if (!hasPriority(tram, competitors)){
        mustWaitLonger = true;
        console.log(tram.name + " must wait");
      }
    }
  }
  return mustWaitLonger;
}


function getCompetitors(tram){
  var competitors = [];
  for (var i=0 ; i<nbTrams ; i++){
    if (nextStationIsNode(allTrams[i]) && allTrams[i]!=tram){
      console.log(allTrams[i].name + " competes with " + tram.name);
      competitors.push(allTrams[i]);
    }
  }
  return competitors;
}

// this also supports the case where several nodes. dont leave simulatenously
function hasPriority(tram, competitors){
  var competingTrams = competitors;
  //competingTrams.push(tram);

  if (getPrioritaryTram(competingTrams, tram) === tram){
    return true;
  }else{
    return false;
  }
}

function getPrioritaryTram(competitors, tram){
  var prioTram = getDefaultPrioritaryTram(competitors, tram);
  var prioTramFromRule = getPrioritaryTramFromRule(competitors, tram);
  if (prioTramFromRule !== null){
    // Use rule
    prioTram = prioTramFromRule;
  }else{
    printInfo("Using default");
  }

  return prioTram;
}

function getPrioritaryTramFromRule(competitors, tram){

  var competingTrams = competitors;
  competingTrams.unshift(tram);
  var nbCompetitors = competingTrams.length;
  var nbsPassengers = [];
  var highestNbPassengers = 0;

  for (var i=1 ; i<nbCompetitors ; i++){
    nbsPassengers.push(competitors[i].nbPassengers);
  }
  nbsPassengers.sort(function(a, b){
    return b-a;
  });

  for (var i=0 ; i<nbCompetitors ; i++){
    if (competingTrams[i].nbPassengers > highestNbPassengers){
      highestNbPassengers = competingTrams[i].nbPassengers;
      prioTram = competingTrams[i];
    }
  }

  if(nbsPassengers[0]>nbsPassengers[1]){
    return prioTram;
  }else{
    // They are equal
    return null;
  }
}

function getDefaultPrioritaryTram(competitors, tram){
  var competingTrams = competitors;
  competingTrams.push(tram);

  var prioTram = competingTrams[0];
  var highestPrio = prioTram.defaultPriority;
  var nbCompetitors = competitors.length;
  for (var i=1 ; i<nbCompetitors ; i++){
    if (competingTrams[i].defaultPriority < highestPrio) {
      // < because (Lowest prio number = Highest prio)
      highestPrio = competingTrams[i].defaultPriority;
      prioTram = competingTrams[i];
    }
  }
  return prioTram;
}