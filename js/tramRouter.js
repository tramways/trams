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
        if (!this.winsPriority(tram, competitors)){
          isAllowed = false;
        }
      }
    }
    return isAllowed;
  },

  getCompetitors: function(tram){
    var competitors = [];
    for (var i=0 ; i<t.nbTrams ; i++){
      if (this.nextStationIsNode(t.trams[i]) && t.trams[i]!=tram){
        //console.log(t.trams[i].name + " competes with " + tram.name);
        competitors.push(t.trams[i]);
      }
    }
    return competitors;
  },

  winsPriority: function(tram, competitors){
    // Also supports the case where several nodes,
    // i.e. don't leave simulatenously

    var competingTrams = competitors;
    if (this.getPrioritaryTram(competitors, tram) === tram){
      return true;
    }else{
      return false;
    }
  },

  getPrioritaryTram: function(competitors, tram){
    var prioTram = this.getDefaultPrioritaryTram(competitors, tram);
    var prioTramFromRule = this.getPrioritaryTramFromRule(competitors, tram);
    if (prioTramFromRule !== null){
      prioTram = prioTramFromRule;
      userInfo.printInfo(prioTram.id + " has priority (more passengers).", false);
    }else{
      // var nbCompetitors = competitors.length;
      // var competitorsList = "";
      // for (var i=0 ; i<nbCompetitors ; i++){
      //     competitorsList += competitors[i].id + " ";
      //     if (i !== nbCompetitors-1){
      //       competitorsList += "and ";
      //     }
      // }
      userInfo.printInfo("Same number of passengers => Using fallback priority rule (A>B>C)", true);
    }

    return prioTram;
  },

  getPrioritaryTramFromRule: function(competitors, tram){

    var competingTrams = competitors;
    competingTrams.unshift(tram);
    var nbCompetitors = competingTrams.length;
    var nbsPassengers = [];
    var highestNbPassengers = 0;

    for (var i=1 ; i<nbCompetitors ; i++){
      nbsPassengers.push(competitors[i].nbPassengers);
    }
    nbsPassengers.sort(function(a, b){
      return b-a;
    });

    for (var i=0 ; i<nbCompetitors ; i++){
      if (competingTrams[i].nbPassengers > highestNbPassengers){
        highestNbPassengers = competingTrams[i].nbPassengers;
        prioTram = competingTrams[i];
      }
    }
    if(nbsPassengers[0]>nbsPassengers[1]){
      return prioTram;
    }else{
      // They are equal
      return null;
    }
  },

  getDefaultPrioritaryTram: function(competitors, tram){
    var competingTrams = competitors;
    competingTrams.push(tram);

    var prioTram = competingTrams[0];
    var highestPrio = prioTram.defaultPriority;
    var nbCompetitors = competitors.length;
    for (var i=1 ; i<nbCompetitors ; i++){
      if (competingTrams[i].defaultPriority < highestPrio) {
        // < because (Lowest prio number = Highest prio)
        highestPrio = competingTrams[i].defaultPriority;
        prioTram = competingTrams[i];
      }
    }
    return prioTram;
  },

  getNextStation: function(tram){
    var currentStationIndex = this.getCurrentStationIndex(tram);
  },

  getCurrentStationIndex: function(tram){
    // we know it's evaluated when the tram is at a station anyway
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
