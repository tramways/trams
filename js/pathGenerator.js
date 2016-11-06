/* ---------------------------
  pathGenerator:
  All rendering settings and
  canvas rendering functions.
--------------------------- */

var p,
pathGenerator = {

  settings: {
    canvasWidth: undefined,
    nbTrams: 0,
    trams: [],
    node: undefined,
    distanceBtwTracks: 0,
    vPaddingCanvas: 0,
    hPaddingCanvas: 0,
    distanceBtwStations: 0,
    mode: 0
  },

  /* ------
  Init
  ------ */

  init: function(trams, myNode, mode){
    this.initGeometry(mode);
    this.initData(trams, myNode);
    p = this.settings;
  },

  initGeometry: function(mode){
    this.settings.mode = mode;

    var canvas = document.getElementById("canvas");
    this.settings.canvasWidth = canvas.width;
    this.settings.distanceBtwTracks = Math.floor(canvas.width/10);
    this.settings.hPaddingCanvas = Math.floor(canvas.width/20);
    this.settings.vPaddingCanvas = Math.floor(canvas.width/10);
    this.settings.distanceBtwStations = Math.floor(canvas.width/6);
  },

  initData: function(trams, myNode){
    this.settings.trams = trams;
    this.settings.nbTrams = trams.length;
    this.settings.node = myNode;
  },

  /* ------
  Generate paths
  ------ */

  generateAllTramPaths: function(mode){

    var stationsBefore = this.getStationsBefore(mode);
    for (var i=0 ; i<p.nbTrams; i++){
      this.resetPath(p.trams[i]);
      this.generatePath(i, p.trams[i], stationsBefore[i]);
    }
  },

  generatePath: function(tramIndex, tram, stationsBefore){
    // Hypothesis: Tram always crosses (= goes through the node)
    var yPosition = (tramIndex*p.distanceBtwTracks) + p.vPaddingCanvas;
    var stationsAfter = this.getRandomNbStationsAfterNode();
    // Add node point to tram path
    tram.path.push({
      x: p.node.x,
      y: yPosition});
    // Add points before node
    for (var i=1 ; i<=stationsBefore ; i++){
      tram.path.unshift({x: p.node.x - i*p.distanceBtwStations,
        y: yPosition});
    }
    // Add points after node
    for (var j=1 ; j<=stationsAfter ; j++){
      tram.path.push({x: p.node.x + j*p.distanceBtwStations,
        y: yPosition});
    }
  },

  resetPath: function(tram){
    tram.path=[];
  },

  /* ------
  Utils for path generation:
  They calculate how many stations we can fit in the canvas,
  so we can adapt to canvas size and avoid overflow.
  ------ */

  getMaxNbStationsBeforeNode: function(){
    var availableHSpace = Math.abs(p.node.x - p.hPaddingCanvas);
    var maxNb = Math.floor(availableHSpace/p.distanceBtwStations);
    return maxNb;
  },

  getMaxNbStationsAfterNode: function(){
    var availableHSpace = (p.canvasWidth - p.node.x) - p.hPaddingCanvas;
    var maxNb = Math.floor(availableHSpace/p.distanceBtwStations);
    return maxNb;
  },

  getRandomNbStationsAfterNode: function(){
    var min = 1;
    var max = this.getMaxNbStationsAfterNode();
    //return Math.floor(Math.random() * (max - min + 1)) + min;
    return 2;
  },

  getRandomNbStationsBeforeNode: function(){
    var min = 2;
    var max = this.getMaxNbStationsBeforeNode();
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


  getStationsBefore: function(mode){
    var stationsBefore = [];
    var stationBefore = this.getRandomNbStationsBeforeNode();
    switch (mode) {
      case 0:
          // All
          for (var i=0 ; i<p.trams.length ; i++){
            stationsBefore.push(stationBefore);
          }
          break;
      case 1:
          // Only two of them (B and C in this example)
          stationsBefore = [stationBefore-1, stationBefore, stationBefore];
          break;
      default:
          for (var i=0 ; i<p.trams.length ; i++){
            stationsBefore.push(stationBefore);
          }
    }
    return stationsBefore;
  }


};
