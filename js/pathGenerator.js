/* ---------------------------
  pathGenerator:
  All rendering settings and
  canvas rendering functions.
--------------------------- */

var p,
pathGenerator = {

  settings: {
    // Trams
    nbTrams: 0,
    trams: [],
    node: undefined
  },

  /* ------
  Init
  ------ */

  init: function(trams, myNode){
    this.initData(trams, myNode);
    p = this.settings();
  },

  initData: function(trams, myNode){
    this.settings.trams = trams;
    this.settings.nbTrams = trams.length;
    this.settings.node = myNode;
  },

  /* ------
  Generate paths
  ------ */

  generateAllTramPaths: function(){
    for (var i=0 ; i<p.nbTrams; i++){
      this.resetPath(p.trams[i]);
      this.generatePath(i, p.trams[i]);
    }
  },

  resetPath: function(tram){
    tram.path=[];
  },

  generatePath: function(tramIndex, tram){
    // H: Tram always crosses

    // need distanceBetweenTramTracks, verticalPaddingCanvas, node,
    // distanceBetweenStations

    var yPosition = (tramIndex*distanceBetweenTramTracks) + verticalPaddingCanvas;
    var stationsBefore = this.getRandomNbStationsBeforeNode();
    var stationsAfter = this.getRandomNbStationsAfterNode();

    tram.path.push({
      x: p.node.x,
      y: yPosition});

    for (var i=1 ; i<=stationsBefore ; i++){
      tram.path.unshift({x: p.node.x - i*distanceBetweenStations,
        y: yPosition});
    }
    for (var j=1 ; j<=stationsAfter ; j++){
      tram.path.push({x: p.node.x + j*distanceBetweenStations,
        y: yPosition});
    }
  }



};
