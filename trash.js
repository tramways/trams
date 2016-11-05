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
