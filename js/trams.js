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

  userInfo.init();
  renderer.init(allTrams, node);
  pathGenerator.init(allTrams, node);
  tramRouter.init(allTrams);

  pathGenerator.generateAllTramPaths();

  initializePosition(tramA);
  initializePosition(tramB);
  initializePosition(tramC);
  reinitialize();

  renderer.drawAll();

  setTimeout(function(){
      goAllTheWay(tramA);
      goAllTheWay(tramB);
      goAllTheWay(tramC);
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
      renderer.drawTram(tram);
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
  var stations = [];
  for (var i=0 ; i<tram.path.length; i++){
    stations.push(tram.path[i].x);
  }
  return stations.indexOf(tram.position.x);
}

function haltAtStation(tram){

  if (tramRouter.checkIfAllowedToGo(tram)){
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

// function getNextStation(tram){
//   var currentStationIndex = getCurrentStationIndex(tram);
// }
//
// function getCurrentStationIndex(tram){
//   // we know it's evaluated when the tram is at a station anyway
//   var currentStationIndex = -1;
//   var nbStations = tram.path.length;
//   for (var i=0 ; i<nbStations ; i++){
//     if (tram.path[i].x === tram.position.x && tram.path[i].y === tram.position.y){
//       currentStationIndex = i;
//     }
//   }
//   return currentStationIndex;
// }
//
// function nextStationIsNode(tram){
//   var nextStationIndex = getCurrentStationIndex(tram) + 1;
//   return (tram.path[nextStationIndex].x === node.x)? true:false;
// }


// function checkIfAllowed(tram){
//   var checkIfAllowed = true;
//   // find out the coordinates
//   if (nextStationIsNode(tram)){
//     var competitors = getCompetitors(tram);
//     if (getCompetitors(tram).length !== 0){
//       if (!hasPriority(tram, competitors)){
//         checkIfAllowed = false;
//         console.log(tram.name + " must wait");
//       }
//     }
//   }
//   return checkIfAllowed;
// }

//
// function getCompetitors(tram){
//   var competitors = [];
//   for (var i=0 ; i<nbTrams ; i++){
//     if (nextStationIsNode(allTrams[i]) && allTrams[i]!=tram){
//       console.log(allTrams[i].name + " competes with " + tram.name);
//       competitors.push(allTrams[i]);
//     }
//   }
//   return competitors;
// }

// // this also supports the case where several nodes, i.e. don't leave simulatenously
// function hasPriority(tram, competitors){
//   var competingTrams = competitors;
//   //competingTrams.push(tram);
//
//   if (getPrioritaryTram(competingTrams, tram) === tram){
//     return true;
//   }else{
//     return false;
//   }
// }

// function getPrioritaryTram(competitors, tram){
//   var prioTram = getDefaultPrioritaryTram(competitors, tram);
//   var prioTramFromRule = getPrioritaryTramFromRule(competitors, tram);
//   if (prioTramFromRule !== null){
//     // Use rule
//     prioTram = prioTramFromRule;
//   }else{
//     userInfo.printInfo("Using default");
//   }
//
//   return prioTram;
// }
//
// function getPrioritaryTramFromRule(competitors, tram){
//
//   var competingTrams = competitors;
//   competingTrams.unshift(tram);
//   var nbCompetitors = competingTrams.length;
//   var nbsPassengers = [];
//   var highestNbPassengers = 0;
//
//   for (var i=1 ; i<nbCompetitors ; i++){
//     nbsPassengers.push(competitors[i].nbPassengers);
//   }
//   nbsPassengers.sort(function(a, b){
//     return b-a;
//   });
//
//   for (var i=0 ; i<nbCompetitors ; i++){
//     if (competingTrams[i].nbPassengers > highestNbPassengers){
//       highestNbPassengers = competingTrams[i].nbPassengers;
//       prioTram = competingTrams[i];
//     }
//   }
//
//   if(nbsPassengers[0]>nbsPassengers[1]){
//     return prioTram;
//   }else{
//     // They are equal
//     return null;
//   }
// }
//
// function getDefaultPrioritaryTram(competitors, tram){
//   var competingTrams = competitors;
//   competingTrams.push(tram);
//
//   var prioTram = competingTrams[0];
//   var highestPrio = prioTram.defaultPriority;
//   var nbCompetitors = competitors.length;
//   for (var i=1 ; i<nbCompetitors ; i++){
//     if (competingTrams[i].defaultPriority < highestPrio) {
//       // < because (Lowest prio number = Highest prio)
//       highestPrio = competingTrams[i].defaultPriority;
//       prioTram = competingTrams[i];
//     }
//   }
//   return prioTram;
// }
