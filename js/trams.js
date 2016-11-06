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
  reinitializeTrams();
  // reinitializeIntervals();
}

function reinitializeCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reinitializeTrams(){
  reinitializeTramsNbPassengers();
  reinitializeTramsPositions();
}

function reinitializeTramsNbPassengers(){
  for (var i=0 ; i<nbTrams ; i++){
    var domId = getDOMId(allTrams[i]);
    allTrams[i].nbPassengers = document.getElementById(domId).value;
  }
};


function reinitializeTramsPositions(){
  for (var i=0 ; i<nbTrams ; i++){
    initializePosition(allTrams[i]);
  }
};

function getDOMId(tram){
  return "nbPassengers" + tram.id;
};
