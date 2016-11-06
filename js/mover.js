/* ---------------------------
  mover.js:
  Deals with tram motion
--------------------------- */

var m,
mover = {
  settings: {
    //infoDiv: document.getElementById("infoStatus")
  },

  init: function(){
    m = this.settings;
  },

  goAllTheWay: function(tram){
    var myInt = setInterval(function(){
      if(mover.isAtAStation(tram) && !mover.isAtFirstStation(tram)){
        //tram.nextStationIndex++;
        if (mover.isAtLastStation(tram)){
          clearInterval(myInt);
        }else{
          clearInterval(myInt);
          mover.haltAtStation(tram);
          //goAllTheWay(tram);
          // after halt: go all the way
        }
      }else{
        mover.moveTram(tram);
      }
      renderer.drawTram(tram);
    }, 10);
    return myInt;
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
      }, haltDuration);
    }else{
      setTimeout(function(){
        mover.haltAtStation(tram);
      }, securityHaltDuration);// will get too much
    }
    /*setTimeout(function(){
      tram.position.x += 1;//this is called too many times, it just accelerates the tram sometimes
      goAllTheWay(tram);
    }, getHaltDuration(tram));*/

  }



};
