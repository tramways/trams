var tramIterator = 0;

function createTram(name, color, nbPassengers){

  var newTram = {
    name: name,
    color: color,
    nbPassengers: nbPassengers,
    // To determine priority if number of passengers is equal:
    defaultPriority: tramIterator,
    // Tram's path on the canvas (series of coordinates):
    path: [],
    previousStation: 0,
    // Current tram's position on the canvas:
    position:{
      x: 0,
      y: 0
    }
    //,
    //nextStationIndex: 1
  };
  tramIterator++;

  return newTram;
}




//stationsDone: 0
