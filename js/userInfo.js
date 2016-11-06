/* ---------------------------
  userInfo:
  Displays information in the html
  about the tram status.
--------------------------- */

var u,
userInfo = {
  settings: {
    infoDiv: document.getElementById("infoStatus")
  },
  init: function(){
    u = this.settings;
  },
  printInfo: function(info, isImportant){
    u.infoDiv.innerHTML = info;
    if (isImportant){
      u.infoDiv.style.backgroundColor = "#F78578";
    }else{
      u.infoDiv.style.backgroundColor = "#A7A09B";
    }
  }
};
