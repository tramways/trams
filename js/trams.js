/* ---------------------------
  userInfo:
  Displays information in the html
  about the tram status.
--------------------------- */

// var a,
// appStarter = {
//   settings: {
//     startTimeOut = 2000
//   },
//   init: function(){
//     a = this.settings;
//   },
//   getDOMId: function(id){
//     return "nbPassengers" + id;
//   },
//   getMode: function(){
//     var mode = 0;
//     if (document.getElementById("some").checked){
//       mode = 1;
//     }
//     return mode;
//   }
// };





var startTimeOut = 2000;
var canvas = document.getElementById("canvas");
var xNode = Math.floor(canvas.width/2);
// Node position (= where trams cross)
var node = {
  x: xNode
};

var tramData = [{id: "A", color: "#C678DD"},
{id: "B", color: "#61AFEF"},
{id: "C", color: "#EEA45F"}];


document.getElementById("goButton").onclick = function() {

  tramManager.init();
  trams = createTrams(tramData);
  initAllModules(trams, node);
  getReady();

  setTimeout(function(){
    userInfo.printInfo("... Starting!", false);
    for (var i=0 ; i<trams.length ; i++){
      mover.goAllTheWay(trams[i]);
    }
  }, startTimeOut);
};

function initAllModules(trams, node){
  mover.init(trams);
  pathGenerator.init(trams, node);
  renderer.init(trams, node);
  tramRouter.init(trams, node);
  userInfo.init();
}

function getReady(){
  userInfo.printInfo("About to start...", false);
  renderer.resetCanvas();
  pathGenerator.generateAllTramPaths(getMode());
  mover.initAllPositions();
  renderer.drawAll();
}

function getDOMId(id){
  return "nbPassengers" + id;
};

function getMode(){
  var mode = 0;
  if (document.getElementById("some").checked){
    mode = 1;
  }
  return mode;
};

function createTrams(tramData){
  for (var i=0; i<tramData.length ; i++){
    var domId = getDOMId(tramData[i].id);
    tramData[i].nbPassengers = document.getElementById(domId).value;
    tramManager.create(tramData[i].id, tramData[i].color, tramData[i].nbPassengers);
  }
  return tramManager.getAllTrams();
}
