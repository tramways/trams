var priority = 0;

function createTram(name, color, nbPassengers){

  var newTram = {
    name: name,
    color: color,
    nbPassengers: nbPassengers,
    // To determine priority if number of passengers is equal:
    defaultPriority: priority,
    // Tram's path on the canvas (series of coordinates):
    path: [],
    // Current tram's position on the canvas:
    position: {
      x: 0,
      y: 0
    }
  };
  priority++;

  return newTram;
}




//stationsDone: 0
