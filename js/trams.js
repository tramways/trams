var startTimeOut = 2000;

// Node position (= where trams cross)

document.getElementById("goButton").onclick = function() {


  var canvas = document.getElementById("canvas");
  var xNode = Math.floor(canvas.width/2);
  var node = {
    x: xNode
  };

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
  tramRouter.init(trams, node);
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
