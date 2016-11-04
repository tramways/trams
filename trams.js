var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var haltDuration = 500;
var tramDotRadius = 8;

var lineWidth = 2;
ctx.lineWidth = lineWidth;

var node = {
  x: 500,
  y: 300
};


// Hypothesis: unique node for now
// Also the exercice clearly states 3 for now, so parallel.

// cross should be an object
// how to know if the next station is a cross?
// - with coordinates of the stations


// 1 - computational approach for all coordinates (calculate)
// 2 - like now, beuhhh

// IRL: oh, same coordinates, that must be a node! NO.
// Instead: "let's make those 3 lines cross."

var nodes={
  // lines: all
  // position: xxx
  // then place the lines accordingly
  // stops before node
  // stops after nodes
  // etc.
};

var tramA = {
  path: [{
      x: 100,
      y: 300
    },
    {
        x: 300,
        y: 300
    },
    node, {
      x: 700,
      y: 300
    }
  ],
  color: 'red',
  stationsDone: 0,
  crosses:["myCross"]
  }
};


var tramB = {
  path: [{
      x: 100,
      y: 350
    },
    node, {
      x: 700,
      y: 350
    }
  ],
  color: 'green',
  stationsDone: 0
};


var tramC = {
  path: [{
      x: 200,
      y: 340
    },
    node, {
      x: 800,
      y: 340
    }
  ],
  color: 'blue',
  stationsDone: 0
};


//pente de 2


/*
var tramB = {
  path: [
    {
        x: 100,
        y: 200
    },
    node,
    {
        x: 400,
        y: 200
    },
  ],
  color: 'blue',
  stationsDone: 0,
  position: {
    x: 10,
    y: 200
  },
  previousPosition:{
    x: 10,
    y: 200
  }
};

var tramC = {
  path: [
    {
        x: 100,
        y: 400
    },
    node,
    {
        x: 400,
        y: 10
    }
  ],
  color: 'green',
  stationsDone: 0,
  position: {
    x: 10,
    y: 400
  },
  previousPosition:{
    x: 10,
    y: 400
  }
};*/

var allTrams = [tramA, tramB, tramC];


function drawTram(tram){
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.arc(tram.position.x, tram.position.y, tramDotRadius, 0, 2*Math.PI);
  ctx.fillStyle = tram.color;
  ctx.fill();
  tram.previousPosition.x = tram.position.x;
  tram.previousPosition.y = tram.position.y;
  tram.position.x += 2;
  tram.position.y += 2;
}

function goToNextStation(tram){
  // while position is not reached
  var myInterval = setInterval(function(){ drawTram(tram) }, 25);
  // when the tram has reached i
  if (tram.position.x > 210){
    alert("wh");
    clearInterval(myInterval);
  }
}

function regularStop(tram){
  currentHaltState++;
}


function drawTracks(tram, myIterator){
  // ctx.beginPath();
  ctx.strokeStyle = "grey";
  // path[myIterator -1]
  //var previousPosition = tram.path[0];
  //var nextPosition = tram.path[1];
  ctx.moveTo(tram.path[0].x, tram.path[0].y);//init context

  var nbStops = tram.path.length;
  for (var i=0 ; i<nbStops ; i++){
    //ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineTo(tram.path[i].x, tram.path[i].y);
    ctx.stroke();
  }


  for (var i=0 ; i<nbStops ; i++){
    ctx.beginPath();
    ctx.arc(tram.path[i].x, tram.path[i].y, 4, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
  }


// drawStops
  /*ctx.beginPath();
  ctx.strokeStyle = 'blue';
  var previousPositionB = [0, 0];
  var nextPositionB = [400, 500];
  ctx.moveTo(previousPositionB[0], previousPositionB[1]);//init context
  ctx.lineTo(nextPositionB[0], nextPositionB[1]);//actually move the tram
  ctx.stroke();*/

  // tram is considered a point!!
}

function drawAllTracks(){
  var numTram = allTrams.length;
  for (var i=0; i<numTram ; i++){
    var tram = allTrams[i];
    drawTracks(tram);
    //tram.currentHaltState ++;
  }
}


function drawAllDots(){
  var numTrams = allTrams.length;
  for (var i=0 ; i<numTrams ; i++){
    drawTram(allTrams[i]);
  }
}

function wouldCollide(){
  // is there a risk of collision?
  // am I in priority?
  // what if same?
}

function continuePath(tram){
  if(checkAllowed(tram)){
    // go to next station
  }else{
    // wait
  }
}

function checkAllowed(tramA){
  return true;
  // if ((tramA.path[stationsDone +1].isNode
  // check number
}

drawAllTracks();
//drawAllDots();
//continuePath(tramA);
//goToNextStation(tramA);

// setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, stationToStationDuration);

// Step 0: Make a plan
// Step 1: Graphically render tram paths (also good for debug)
// Finally animate lines (http://stackoverflow.com/questions/23939588/how-to-animate-drawing-lines-on-canvas)
// Use real distances
