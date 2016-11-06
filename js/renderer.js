/* ---------------------------
  renderer.js:
  All rendering settings and
  canvas rendering functions.
--------------------------- */


var s,
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

  init: function(trams, myNode) {
    this.initCanvas();
    this.initData(trams, myNode);
    s = this.settings;
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

  drawText: function(color, text, x, y){
    s.ctx.fillStyle = color;
    s.ctx.font = s.font;
    s.ctx.fillText(text, x, y);
  },

  drawAllTracks: function(){
    for (var i=0; i<s.nbTrams ; i++){
      var tram = s.trams[i];
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
    s.ctx.moveTo(tram.path[0].x, tram.path[0].y);
    s.ctx.strokeStyle = s.tracksColor;
    s.ctx.lineWidth = s.lineWidthRailway;
    s.ctx.lineTo(tram.path[nbStations -1].x, tram.path[nbStations -1].y);
    s.ctx.stroke();
  },

  drawStations: function(tram){
    var nbStations = tram.getNbStations();
    for (var i=0 ; i<nbStations ; i++){
      s.ctx.beginPath();
      s.ctx.arc(tram.path[i].x, tram.path[i].y, s.stationRadius, 0, 2*Math.PI);
      s.ctx.strokeStyle = s.tracksColor;
      s.ctx.fillStyle = s.fillStationsColor;
      s.ctx.fill();
      s.ctx.stroke();
    }
  },

  drawName: function(tram){
    this.drawText(tram.color, tram.name, tram.path[0].x -60, tram.path[0].y +4);
  },


  /* ------
  Render tram
  ------ */

  drawtrams: function(){
    for (var i=0 ; i<s.nbTrams ; i++){
      drawTram(s.trams[i]);
    }
  },

  drawTram: function(tram){
    // The tram is drawn as a point.
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    s.ctx.beginPath();
    s.ctx.arc(tram.position.x, tram.position.y, s.tramDotRadius, 0, 2*Math.PI);
    s.ctx.fillStyle = tram.color;
    s.ctx.fill();
  },

  /* ------
  Render node
  ------ */

  drawNode: function(){

    var yFirstTram = s.trams[0].path[0].y;
    var yLastTram = s.trams[s.trams.length - 1].path[0].y;
    var rectangleWidth = s.stationRadius*5;
    var rectangleHeight = yLastTram - yFirstTram + rectangleWidth;

    var startingPoint = {
      x: s.node.x - (rectangleWidth/2),
      y: yFirstTram - (rectangleWidth/2)
    }
    s.ctx.rect(startingPoint.x, startingPoint.y, rectangleWidth, rectangleHeight);
    s.ctx.lineCap = 'round';
    s.ctx.strokeStyle = s.nodeColor;
    s.ctx.lineWidth = s.lineWidthNode;
    s.ctx.stroke();

    this.drawText(s.nodeTextColor, "Cross", startingPoint.x -8, startingPoint.y -10);
  }

  // bindUIActions: function() {
  //   s.moreButton.on("click", function() {
  //     NewsWidget.getMoreArticles(s.numArticles);
  //   });
  // },

  // getMoreArticles: function(numToGet) {
  //   // $.ajax or something
  //   // using numToGet as param
  // }

};
