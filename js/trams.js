var startTimeOut = 2000;

// Node position (= where trams cross)
var xNode = Math.floor(canvasWidth/2);
var node = {
  x: xNode
};

document.getElementById("goButton").onclick = function() {

  tramManager.init();

  var tramData = [{id: "A", color: "#C678DD"},
  {id: "B", color: "#61AFEF"},
  {id: "C", color: "#EEA45F"}];

  for (var k=0; k<tramData.length ; k++){
    var domId = getDOMId(tramData[k].id);
    tramData[k].nbPassengers = document.getElementById(domId).value;
    tramManager.create(tramData[k].id, tramData[k].color, tramData[k].nbPassengers);
  }
  var trams = tramManager.getAllTrams();

  renderer.init(trams, node);
  pathGenerator.init(trams, node);
  tramRouter.init(trams);
  mover.init(trams);
  userInfo.init();

  userInfo.printInfo("About to start...");

  pathGenerator.generateAllTramPaths();
  mover.initAllPositions();
  renderer.resetCanvas();

  renderer.drawAll();

  setTimeout(function(){
    userInfo.printInfo("... Starting!");
    for (var i=0 ; i<nbTrams ; i++){
      mover.goAllTheWay(trams[i]);
    }
  }, startTimeOut);
};

function getDOMId(id){
  return "nbPassengers" + id;
};
