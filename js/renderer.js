/* ---------------------------
  renderer:
  All canvas rendering settings
  and functions.
--------------------------- */

var r,
renderer = {

  settings: {
    // Trams
    nbTrams: 0,
    trams: [],
    tramDotRadius: 2,
    // Tracks
    tracksColor: "#ABB2BF",
    fillStationsColor: "#282C34",
    lineWidthRailway: 1,
    stationRadius: 4,
    // Node
    lineWidthNode: 1,
    nodeColor: 'white',
    nodeTextColor: 'white',
    // Utils
    font: "1em sans-serif",
    node: undefined
    // articleList: $("#article-list")
  },

  /* ------
  Init
  ------ */

  init: function(trams, myNode) {
    this.initCanvas();
    this.initData(trams, myNode);
    r = this.settings;
    //this.bindUIActions();
  },

  initData: function(trams, myNode){
    this.settings.trams = trams;
    this.settings.nbTrams = trams.length;
    this.settings.node = myNode;
  },

  initCanvas: function(){
    var canvas = document.getElementById("canvas");
    this.settings.ctx = canvas.getContext("2d");
  },

  /* ------
  Utils rendering functions
  ------ */

  drawText: function(color, text, x, y){
    r.ctx.fillStyle = color;
    r.ctx.font = r.font;
    r.ctx.fillText(text, x, y);
  },

  drawAll: function(){
    this.drawAllTracks();
    this.drawNode();
    this.drawAllTrams();
  },

  /* ------
  Render tracks
  ------ */

  drawAllTracks: function(){
    for (var i=0; i<r.nbTrams ; i++){
      var tram = r.trams[i];
      this.drawTracks(tram);
    }
  },

  drawTracks: function(tram){
    this.drawRailway(tram);
    this.drawStations(tram);
    this.drawName(tram);
  },

  drawRailway: function(tram){
    var nbStations = tram.getNbStations();
    r.ctx.moveTo(tram.path[0].x, tram.path[0].y);
    r.ctx.strokeStyle = r.tracksColor;
    r.ctx.lineWidth = r.lineWidthRailway;
    r.ctx.lineTo(tram.path[nbStations -1].x, tram.path[nbStations -1].y);
    r.ctx.stroke();
  },

  drawStations: function(tram){
    var nbStations = tram.getNbStations();
    for (var i=0 ; i<nbStations ; i++){
      r.ctx.beginPath();
      r.ctx.arc(tram.path[i].x, tram.path[i].y, r.stationRadius, 0, 2*Math.PI);
      r.ctx.strokeStyle = r.tracksColor;
      r.ctx.fillStyle = r.fillStationsColor;
      r.ctx.fill();
      r.ctx.stroke();
    }
  },

  drawName: function(tram){
    this.drawText(tram.color, tram.name, tram.path[0].x -60, tram.path[0].y +4);
  },

  /* ------
  Render tram
  ------ */

  drawAllTrams: function(){
    for (var i=0 ; i<r.nbTrams ; i++){
      this.drawTram(r.trams[i]);
    }
  },

  drawTram: function(tram){
    // The tram is drawn as a point.
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    r.ctx.beginPath();
    r.ctx.arc(tram.position.x, tram.position.y, r.tramDotRadius, 0, 2*Math.PI);
    r.ctx.fillStyle = tram.color;
    r.ctx.fill();
  },

  /* ------
  Render node
  ------ */

  drawNode: function(){
    var width = this.getNodeRectangleWidth();
    var height = this.getNodeRectangleHeight();
    var startingPoint = this.getNodeRectangleStartingPoint();

    this.drawNodeRectangle(startingPoint, width, height);
    this.drawNodeName("Cross", startingPoint);
  },

  drawNodeRectangle: function(startingPoint, width, height){
    r.ctx.rect(startingPoint.x, startingPoint.y, width, height);
    r.ctx.lineCap = 'round';
    r.ctx.strokeStyle = r.nodeColor;
    r.ctx.lineWidth = r.lineWidthNode;
    r.ctx.stroke();
  },

  drawNodeName: function(nodeName, startingPoint){
    this.drawText(r.nodeTextColor, nodeName, startingPoint.x -8, startingPoint.y -10);
  },

  getYFirstTram: function(){
    return r.trams[0].path[0].y;
  },

  getNodeRectangleWidth: function(){
    return r.stationRadius*5;
  },

  getNodeRectangleHeight: function(){
    var yFirstTram = r.trams[0].path[0].y;
    var yLastTram = r.trams[r.trams.length - 1].path[0].y;
    var rectangleWidth = this.getNodeRectangleWidth();
    return yLastTram - yFirstTram + rectangleWidth;
  },

  getNodeRectangleStartingPoint: function(){
    var rectangleWidth = this.getNodeRectangleWidth();
    var yFirstTram = this.getYFirstTram();
    var startingPoint = {
      x: r.node.x - (rectangleWidth/2),
      y: yFirstTram - (rectangleWidth/2)
    }
    return startingPoint;
  }

  // bindUIActions: function() {
  //   r.moreButton.on("click", function() {
  //     NewsWidget.getMoreArticles(s.numArticles);
  //   });
  // },

  // getMoreArticles: function(numToGet) {
  //   // $.ajax or something
  //   // using numToGet as param
  // }

};
