/* ---------------------------
  Core app behaviour:
  Displays information in the html
  about the tram status.
--------------------------- */

var a,
appStarter = {
  settings: {
    startTimeOut: 2000,
    tramData: [{id: "A", color: "#C678DD"},
    {id: "B", color: "#61AFEF"},
    {id: "C", color: "#EEA45F"}],
    node: undefined
  },
  init: function(){

    this.settings.node = {
      x: this.generateNodeX()
    }
    // Node x-position (= x where trams cross)

    a = this.settings;

    document.getElementById("goButton").onclick = function() {
      tramManager.init();
      var trams = appStarter.createTrams(a.tramData);
      appStarter.initAllModules(trams, a.node);
      appStarter.getReady();
      setTimeout(function(){
        userInfo.printInfo("... Starting!", false);
        for (var i=0 ; i<trams.length ; i++){
          mover.goAllTheWay(trams[i]);
        }
      }, appStarter.startTimeOut);
    };
  },

  initAllModules: function(trams, node){
    mover.init(trams);
    pathGenerator.init(trams, node);
    renderer.init(trams, node);
    tramRouter.init(trams, node);
    userInfo.init();
  },

  getReady: function(){
    userInfo.printInfo("About to start...", false);
    renderer.resetCanvas();
    pathGenerator.generateAllTramPaths(this.getMode());
    mover.initAllPositions();
    renderer.drawAll();
  },

  createTrams: function(tramData){
    for (var i=0; i<tramData.length ; i++){
      var domId = "nbPassengers" + tramData[i].id;
      tramData[i].nbPassengers = document.getElementById(domId).value;
      tramManager.create(tramData[i].id, tramData[i].color, tramData[i].nbPassengers);
    }
    return tramManager.getAllTrams();
  },

  getMode: function(){
    var mode = 0;
    if (document.getElementById("some").checked){
      mode = 1;
    }
    return mode;
  },

  generateNodeX: function(){
    var canvas = document.getElementById("canvas");
    return Math.floor(canvas.width/2);
  }
};
