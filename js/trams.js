// Functional settings
var haltDuration = 2000;
var securityHaltDuration = 3200;

// Graphics settings
var startTimeOut = 2000;

// Trams
var defaultNbPassengers = 0;
var tramA = createTram("A", "#C678DD", defaultNbPassengers);
var tramB = createTram("B", "#61AFEF", defaultNbPassengers);
var tramC = createTram("C", "#EEA45F", defaultNbPassengers);
var allTrams = [tramA, tramB, tramC];
// var nbTrams = allTrams.length;

// Node position (= where trams cross)
var xNode = Math.floor(canvasWidth/2);
var node = {
  x: xNode,
  impactedTrams: allTrams
};


function initializePosition(tram){
  tram.position = {
    x: tram.path[0].x,
    y: tram.path[0].y
  };
}

document.getElementById("goButton").onclick = function() {

  renderer.init(allTrams, node);
  pathGenerator.init(allTrams, node);
  tramRouter.init(allTrams);
  userInfo.init();
  mover.init();

  pathGenerator.generateAllTramPaths();

  initializePosition(tramA);
  initializePosition(tramB);
  initializePosition(tramC);
  reinitialize();

  renderer.drawAll();

  setTimeout(function(){
      mover.goAllTheWay(tramA);
      mover.goAllTheWay(tramB);
      mover.goAllTheWay(tramC);
  }, startTimeOut);
};

function reinitialize(){
  reinitializeCanvas();
  initializeTramsNbPassengers();
  initializeTramsPositions();
  initializeIntervals();
}

function reinitializeCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

// function goAllTheWay(tram){
//     var vx = 1;
//     var vy = 0;
//     var myInt = setInterval(function(){
//       if(isAtAStation(tram) && !isAtFirstStation(tram)){
//         //tram.nextStationIndex++;
//         if (isAtLastStation(tram)){
//           clearInterval(myInt);
//         }else{
//           clearInterval(myInt);
//           haltAtStation(tram);
//           //goAllTheWay(tram);
//           // after halt: go all the way
//         }
//       }else{
//         tram.position.x += vx;
//         tram.position.y += vy;
//       }
//       renderer.drawTram(tram);
//     }, 10);
//     return myInt;
// }

//
// function isAtLastStation(tram){
//   var lastStationIndex = tram.path.length - 1;
//   return getCurrentStationIndex(tram) === lastStationIndex? true:false;
// }
//
// function isAtFirstStation(tram){
//   return getCurrentStationIndex(tram) === 0? true:false;
// }
//
// function isAtAStation(tram){
//   return getCurrentStationIndex(tram) > -1? true:false;
// }

// function getCurrentStationIndex(tram){
//   // Only x counts
//   var stations = [];
//   for (var i=0 ; i<tram.path.length; i++){
//     stations.push(tram.path[i].x);
//   }
//   return stations.indexOf(tram.position.x);
// }
//
// function haltAtStation(tram){
//
//   if (tramRouter.checkIfAllowedToGo(tram)){
//     setTimeout(function(){
//       tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
//       goAllTheWay(tram);
//     }, haltDuration);
//   }else{
//     setTimeout(function(){
//       haltAtStation(tram);
//     }, securityHaltDuration);// will get too much
//   }
//   /*setTimeout(function(){
//     tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
//     goAllTheWay(tram);
//   }, getHaltDuration(tram));*/
//
// }
