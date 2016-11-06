/* ---------------------------
  tramRouter:
  Logics for tram prioritization
  (= business logics)
--------------------------- */

var t,
tramRouter = {
  settings: {
    nbTrams: 0,
    trams: [],
    node: undefined
  },

  init: function(trams, node){
    this.initData(trams, node);
    t = this.settings;
  },

  initData: function(trams, node){
    this.settings.trams = trams;
    this.settings.nbTrams = trams.length;
    this.settings.node = node;
  },

  checkIfAllowedToGo: function(tram){
    var isAllowed = true;
    // find out the coordinates
    if (this.nextStationIsNode(tram)){
      var competitors = this.getCompetitors(tram);
      if (this.getCompetitors(tram).length !== 0){
        if (!this.checkWinsPriority(tram, competitors)){
          isAllowed = false;
        }
      }
    }
    return isAllowed;
  },

  getCompetitors: function(tram){
    var competitors = [];
    for (var i=0 ; i<t.nbTrams ; i++){
      if (this.nextStationIsNode(t.trams[i]) && t.trams[i]!==tram){
        //console.log(t.trams[i].name + " competes with " + tram.name);
        competitors.push(t.trams[i]);
      }
    }
    return competitors;
  },

  checkWinsPriority: function(tram, competitors){
    // Also supports the case where several nodes,
    // i.e. don't leave simulatenously
    var competingTrams = competitors;
    if (this.getPrioritaryTram(tram, competitors) === tram){
      return true;
    }else{
      return false;
    }
  },

  getPrioritaryTram: function(tram, competitors){

    var allCompetitors = competitors;
    allCompetitors.unshift(tram);
    var tramsWithMostPassengers = this.getTramsWithMostPassengers(allCompetitors);
    var prioTram = undefined;

    if(tramsWithMostPassengers.length === 1){
      prioTram = tramsWithMostPassengers[0];
      userInfo.printInfo(prioTram.id + " has priority (more passengers).", false);
    }else{
      prioTram = this.getDefaultPrioritaryTram(tramsWithMostPassengers);
      userInfo.printInfo("Same number of passengers => Using fallback priority rule (A>B>C). " + prioTram.id + " wins.", true);
    }

    return prioTram;
  },

  getTramsWithMostPassengers: function(allCompetitors){
    var nbCompetingTrams = allCompetitors.length;
    var tramWithMostPassengers = allCompetitors[0];
    var tramsWithMostPassengers=[];
    var maxNbPassengers = this.getMaxNbPassengers(allCompetitors);
    for (var i=0 ; i<nbCompetingTrams ; i++){
      if (allCompetitors[i].nbPassengers == maxNbPassengers){
        tramsWithMostPassengers.push(allCompetitors[i]);
      }
    }
    return tramsWithMostPassengers;
  },

  getMaxNbPassengers: function(trams){
    var numbers = [];
    var nbTrams = trams.length;
    for (var i=0; i<nbTrams ; i++){
      numbers.push(trams[i].nbPassengers);
    }
    return Math.max(...numbers);
  },

  getDefaultPrioritaryTram: function(allCompetitors){

    var prioTram = allCompetitors[0];
    var highestPrio = prioTram.defaultPriority;
    var nbCompetitors = allCompetitors.length;
    for (var i=1 ; i<nbCompetitors ; i++){
      if (allCompetitors[i].defaultPriority < highestPrio) {
        // < because (Lowest prio number = Highest prio)
        highestPrio = allCompetitors[i].defaultPriority;
        prioTram = allCompetitors[i];
      }
    }
    return prioTram;
  },

  getNextStation: function(tram){
    var currentStationIndex = this.getCurrentStationIndex(tram);
  },

  getCurrentStationIndex: function(tram){
    // Is evaluated when the tram is at a station
    var currentStationIndex = -1;
    var nbStations = tram.path.length;
    for (var i=0 ; i<nbStations ; i++){
      if (tram.path[i].x === tram.position.x && tram.path[i].y === tram.position.y){
        currentStationIndex = i;
      }
    }
    return currentStationIndex;
  },

  nextStationIsNode: function(tram){
    var nextStationIndex = this.getCurrentStationIndex(tram) + 1;
    return (tram.path[nextStationIndex].x === t.node.x)? true:false;
  }

};
