/* ---------------------------
  tramManager:
  Create and manages tram objects and their content.
--------------------------- */

var s,
tramManager = {

  settings: {
    priority: 0,
    trams: []
  },

  init: function(){
    s = this.settings;
    this.resetAllIntervals();
    this.resetTrams();
  },

  resetTrams: function(){
    this.settings.trams = [];
  },

  resetAllIntervals(){
    nbTrams = s.trams.length;
    for(var i=0; i<nbTrams ; i++){
        clearInterval(s.trams[i].myInterval);
    }
  },

  create: function(id, color, nbPassengers){
    var newTram = {
      id: id,
      name: "Tram " + id,
      color: color,
      nbPassengers: nbPassengers,
      // To determine priority if number of passengers is equal:
      defaultPriority: s.priority,
      // Tram's path on the canvas (series of coordinates):
      path: [],
      // Current tram's position on the canvas:
      position: {
        x: 0,
        y: 0
      },
      getNbStations: function(){
        return newTram.path.length;
      }
    };
    s.priority++;
    s.trams.push(newTram);

    return newTram;
  },

  getAllTrams: function(){
    return s.trams;
  }
};
