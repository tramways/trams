var tramDotRadius = 2;
var fontTramName = "1em sans-serif";


function drawTram(tram){
  // The tram is drawn as a point.
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
}


function drawTracks(tram){
  ctx.moveTo(tram.path[0].x, tram.path[0].y);
  //Initialization context

  var nbStations = tram.path.length;

  ctx.strokeStyle = tracksColor;
  ctx.lineWidth = 1;
  ctx.lineTo(tram.path[nbStations -1].x, tram.path[nbStations -1].y);
  ctx.stroke();

  for (var i=0 ; i<nbStations ; i++){
    ctx.beginPath();
    ctx.arc(tram.path[i].x, tram.path[i].y, stationRadius, 0, 2*Math.PI);
    ctx.strokeStyle = tracksColor;
    ctx.fillStyle = fillStationsColor;
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = tram.color;
  ctx.font = fontTramName;
  ctx.fillText(tram.name, tram.path[0].x -60, tram.path[0].y +4);
}
