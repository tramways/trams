//Need trams



function generateAllTramPaths(){
  for (var tramIndex=0 ; tramIndex<nbTrams; tramIndex++){
    resetPath(allTrams[tramIndex]);
    generatePath(tramIndex, allTrams[tramIndex]);
  }
}

function resetPath(tram){
  tram.path=[];
}
