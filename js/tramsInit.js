var priority = 0;

function createTram(id, color, nbPassengers){
  var newTram = {
    id: id,
    name: generateNameFromId(id),
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

function generateNameFromId(id){
  return "Tram " + id;
}
