/* ---------------------------
  mover.js:
  Deals with tram motion, speeds, etc.
--------------------------- */

var m,
mover = {

  settings: {
    nbTrams: 0,
    trams: [],
    haltDuration: 2000,
    securityHaltDuration: 3200,
    myInterval: undefined
  },

  init: function(trams){
    this.initData(trams);
    m = this.settings;
  },

  initData: function(trams){
    this.settings.trams = trams;
    this.settings.nbTrams = trams.length;
  },

  goAllTheWay: function(tram){
    var myInt = setInterval(function(){
      if(mover.isAtAStation(tram) && !mover.isAtFirstStation(tram)){
        if (mover.isAtLastStation(tram)){
          clearInterval(myInt);
        }else{
          clearInterval(myInt);
          mover.haltAtStation(tram);
        }
      }else{
        mover.moveTram(tram);
      }
      renderer.drawTram(tram);
    }, 10);
    //myInterval = myInt;
    //return myInt;
  },

  moveTram: function(tram){
    var vx = 1;
    var vy = 0;
    tram.position.x += vx;
    tram.position.y += vy;
  },

  isAtLastStation: function(tram){
    var lastStationIndex = tram.path.length - 1;
    return this.getCurrentStationIndex(tram) === lastStationIndex? true:false;
  },

  isAtFirstStation: function(tram){
    return this.getCurrentStationIndex(tram) === 0? true:false;
  },

  isAtAStation: function(tram){
    return this.getCurrentStationIndex(tram) > -1? true:false;
  },

  getCurrentStationIndex: function(tram){
    // Only x counts
    var stations = [];
    for (var i=0 ; i<tram.path.length; i++){
      stations.push(tram.path[i].x);
    }
    return stations.indexOf(tram.position.x);
  },

  haltAtStation: function(tram){

    if (tramRouter.checkIfAllowedToGo(tram)){
      setTimeout(function(){
        tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
        mover.goAllTheWay(tram);
      }, m.haltDuration);
    }else{
      setTimeout(function(){
        mover.haltAtStation(tram);
      }, m.securityHaltDuration);// will get too much
    }
    /*setTimeout(function(){
      tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
      goAllTheWay(tram);
    }, getHaltDuration(tram));*/

  },

  initAllPositions: function(){
    for (var i=0 ; i< m.nbTrams ; i++){
      this.initPosition(m.trams[i]);
    }
  },

  initPosition: function(tram){
      tram.position = {
        x: tram.path[0].x,
        y: tram.path[0].y
      };
  }



};
