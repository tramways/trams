var haltDuration = 2000;
var securityHaltDuration = 3000;
var tramDotRadius = 6;
var stationRadius = 4;

var tracksColor = "#555b67";

var lineWidth = 3;
ctx.lineWidth = lineWidth;

var distanceBetweenStations = Math.floor(canvasWidth/10);
var paddingCanvas = Math.floor(canvasWidth/10);
var distanceBetweenTramTracks = Math.floor(canvasWidth/20);

var tramA = createTram("Tramway A", 'red', 10);
var tramB = createTram("Tramway B", 'blue', 10);
var tramC = createTram("Tramway C", 'green', 80);

var allTrams = [tramA, tramB, tramC];
// how to make it robust?? ie how to make it so, that the node is always on the
// path  (and forbidden if not on path)
// Take a tram
// Say 'that Y will be a node'
// Use this coordinate for all trams


var node = {
  x: canvasWidth/2,
  impactedTrams: allTrams
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
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return 2;
}

function getRandomNumberOfStationsBeforeNode(){
  var min = 1;
  var max = getMaxNumberOfStationsBeforeNode();
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  return 2;
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

  initializePosition(tram);
}


function initializePosition(tram){
  tram.position = {
    x: tram.path[0].x,
    y: tram.path[0].y
  };
}

// var nodes= [node];
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
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
}


function drawTracks(tram){
  ctx.moveTo(tram.path[0].x, tram.path[0].y);
  //init context

  var nbStations = tram.path.length;
  for (var i=0 ; i<nbStations ; i++){
    ctx.strokeStyle = tracksColor;
    ctx.lineTo(tram.path[i].x, tram.path[i].y);
    ctx.stroke();
  }

  for (var i=0 ; i<nbStations ; i++){
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

//drawAllTrams();

setTimeout(function(){
    goAllTheWay(tramA);
    goAllTheWay(tramB);
    goAllTheWay(tramC);
}, 500);


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
  console.log(tram.name + " arrived at station");
  /*if (tram === tramA){
    console.log(tram.name + ": start halt at " + tram.position.x);
  }*/
  // if (tram === tramA){
  //   console.log(tram.name + ": halt is called");
  // }


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


/*function getHaltDuration(tram){
  var haltDurationX = haltDuration;
  if (mustWaitLonger(tram)){
    haltDurationX += additionalhaltDuration;
  }
  return haltDurationX;
}*/

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




//
// function getPrioritaryTramFromRule(competitors){
//   var prioTram = null;
//   var nbCompetitors = competitors.length;
//
//   var nbsPassengers=[];
//   var sortedTrams = [];
//
//   for (var i=1 ; i<nbCompetitors ; i++){
//     nbsPassengers.push(competitors[i].nbPassengers);
//   }
//   nbsPassengers.sort(function(a, b){
//     return b-a
//   });
//
//   for (var i=1 ; i<nbCompetitors ; i++){
//     nbsPassengers.push(competitors[i].nbPassengers);
//   }
//
//   if (nbsPassengers[0] > nbsPassengers[1]){
//     prioTram =
//   }
//
//   return prioTram;
// }


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
  var numTrams = allTrams.length;
  for (var i=0 ; i<numTrams ; i++){
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
    console.log("Using default");
  }
  //var prioTram = getPrioritaryTramFromRule(competitors, tram);

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


  /*var prioTrams = [];
  var prioTram = null;
  var highestNbPassengers = 0;
  var nbCompetitors = competingTrams.length;

  for (var i=0 ; i<nbCompetitors ; i++){
    if (competingTrams[i].nbPassengers > highestNbPassengers){
      highestNbPassengers = competingTrams[i].nbPassengers;
      prioTram = competingTrams[i];
    }else if (competingTrams[i].nbPassengers === highestNbPassengers){
      prioTrams.push(prioTram);
    }else{
    }
  }
  if (prioTrams.length === 1){
    prioTram = prioTrams[0];
  }
  return prioTram;*/
}

function getDefaultPrioritaryTram(competitors, tram){
  var competingTrams = competitors;
  competingTrams.push(tram);

  var prioTram = competingTrams[0];
  var highestPrio = prioTram.defaultPriority;
  var nbCompetitors = competitors.length;
  for (var i=1 ; i<nbCompetitors ; i++){
    if (competingTrams[i].defaultPriority < highestPrio) {
      // Low prio number means high prio.
      highestPrio = competingTrams[i].defaultPriority;
      prioTram = competingTrams[i];
    }
  }
  return prioTram;
}





  //var hasPriority = false;
  //var nbCompetitors = competitors.length;
  //if (nbCompetitors > 0){

  /*if (strictHigher exists && strictHigher=me){
    return true
  }else if (strictHigher exists && strictHigher!=me){
    return false
  } else {
    return highestDefaultPriority
  }


    for (var i=0; i<nbCompetitors ; i++){
      if (competitors[i].nbPassengers > tram.nbPassengers){
      // if at least one other competitor has strictly more passengers
        console.log(tram.name +" has no prio because of " + competitors[i].name);
        return false;
      }else{
        for (var i=0; i<nbCompetitors ; i++){
        }
        console.log(tram.name +" has prio");
        return true;
        // if no other competitor
      }
    }*/
  //}

  /*var numTrams = allTrams.length;
  if (isNumPassengersDifferent()){

  }else{
    var highestPriority = Math.max(tramA.defaultPriority, tramB.defaultPriority, tramC.defaultPriority);
  }
  for (var i=0 ; i<numTrams ; i++){
    //if()
  }*/
