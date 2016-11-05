/*function goToNextStation(tram){

  if (checkIfCanGo(tram)){

    var nextStationIndex = tram.previousStation + 1;
    var nextStationPosition = tram.path[nextStationIndex];
    var myInterval = setInterval(function(){
      if (tram.position.x < nextStationPosition.x){
        drawTram(tram);
        tram.position.x += 1;
        tram.position.y += 0;
      }else if (tram.position.x === nextStationPosition.x){
        drawTram(tram);
        clearInterval(myInterval);
        tram.previousStation++;
        //freezes for 2 sec


        //tram.position.x = nextStationPosition.x;
        //tram.previousStation +=1;
        //regularStop(tram);
      }
    }, 25);

    /*if (tram.position.x >= nextStationPosition.x){
      clearInterval(myInterval);
    }*/

    /*tram.position.x = nextStationPosition.x;
    tram.position.y = nextStationPosition.y;*/

    /*tram.position.x += 2;
    tram.position.y += 2;*/

    /*drawTram(tram);
    //regularStop(tram);
    //nextStationIndex++;
  }


}*/

/*function regularStop(tram){
  //alert(tram.name + ": " + tram.path[tram.previousStation + 1].x);
  setTimeout(goToNextStation(tram), 1000);
}*/

/*function goAndStop(tram){

  //goToNextStation(tram);
  //setTimeout(function(){goToNextStation(tram);}, 4000);
  var nextStationIndex = tram.previousStation + 1;
  var nextStationPosition = tram.path[nextStationIndex];
  while(tram.position.x < nextStationPosition.x){
    tram.position.x += 5;
    console.log("updated");
    tram.position.y += 0;
    drawTram(tram);
  }
}*/

/*function checkIfCanGo(tram){
  //alert("can go");
  // for all trams, is the next station a node for one of them?
  return true;
}*/


/*function go(){
  //while(tramA.position.x < tramA.path[tramA.path.length - 1].x){
  while(tramA.currentStationIndex < tramA.path.length){
    console.log("yo");
    drawTram(tramA);
    //tramA.position.x = tramA.path[tramA.path.length - 1].x;

    tramA.currentStationIndex++;
    tramA.position.x = tramA.path[tramA.currentStationIndex].x;
    tramA.position.y = tramA.path[tramA.currentStationIndex].y;
  }
}*/
/*setTimeout(function(){
  while(tramA.position.x < tramA.path[tramA.path.length - 1].x){
    console.log("yo");
    drawTram(tramA);
    tramA.position.x += 80;
    setTimeout(function(){}, 1000);
  }
}, 800);*/

// setTimeout(function(){ ctx.lineTo(700, 700); ctx.stroke();}, stationToStationDuration);


/*function stopAndGoToNextStation(tram){
  var stopDuration = 1000;
  setTimeout(function(){
    goToNextStation(tram); // needs to be wrapped (closure) otherwise is invoked immediately
  }, stopDuration);
}*/







  //var hasPriority = false;
  //var nbCompetitors = competitors.length;
  //if (nbCompetitors > 0){

  /*if (strictHigher exists && strictHigher=me){
    return true
  }else if (strictHigher exists && strictHigher!=me){
    return false
  } else {
    return highestDefaultPriority
  }


    for (var i=0; i<nbCompetitors ; i++){
      if (competitors[i].nbPassengers > tram.nbPassengers){
      // if at least one other competitor has strictly more passengers
        console.log(tram.name +" has no prio because of " + competitors[i].name);
        return false;
      }else{
        for (var i=0; i<nbCompetitors ; i++){
        }
        console.log(tram.name +" has prio");
        return true;
        // if no other competitor
      }
    }*/
  //}

  /*var numTrams = allTrams.length;
  if (isNumPassengersDifferent()){

  }else{
    var highestPriority = Math.max(tramA.defaultPriority, tramB.defaultPriority, tramC.defaultPriority);
  }
  for (var i=0 ; i<numTrams ; i++){
    //if()
  }*/





  function wouldCollide(){
    // is there a risk of collision?
    // am I in priority?
    // what if same?
  }

  // how to make it robust?? ie how to make it so, that the node is always on the
  // path  (and forbidden if not on path)
  // Take a tram
  // Say 'that Y will be a node'
  // Use this coordinate for all trams
  // var nodes= [node];
    // lines: all
    // position: xxx
    // then place the lines accordingly


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

  //
  // function getPrioritaryTramFromRule(competitors){
  //   var prioTram = null;
  //   var nbCompetitors = competitors.length;
  //
  //   var nbsPassengers=[];
  //   var sortedTrams = [];
  //
  //   for (var i=1 ; i<nbCompetitors ; i++){
  //     nbsPassengers.push(competitors[i].nbPassengers);
  //   }
  //   nbsPassengers.sort(function(a, b){
  //     return b-a
  //   });
  //
  //   for (var i=1 ; i<nbCompetitors ; i++){
  //     nbsPassengers.push(competitors[i].nbPassengers);
  //   }
  //
  //   if (nbsPassengers[0] > nbsPassengers[1]){
  //     prioTram =
  //   }
  //
  //   return prioTram;
  // }


  /*function getHaltDuration(tram){
    var haltDurationX = haltDuration;
    if (mustWaitLonger(tram)){
      haltDurationX += additionalhaltDuration;
    }
    return haltDurationX;
  }*/


    /*var prioTrams = [];
    var prioTram = null;
    var highestNbPassengers = 0;
    var nbCompetitors = competingTrams.length;

    for (var i=0 ; i<nbCompetitors ; i++){
      if (competingTrams[i].nbPassengers > highestNbPassengers){
        highestNbPassengers = competingTrams[i].nbPassengers;
        prioTram = competingTrams[i];
      }else if (competingTrams[i].nbPassengers === highestNbPassengers){
        prioTrams.push(prioTram);
      }else{
      }
    }
    if (prioTrams.length === 1){
      prioTram = prioTrams[0];
    }
    return prioTram;*/
