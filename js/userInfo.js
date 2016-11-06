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
  printInfo: function(info){
    u.infoDiv.innerHTML = info;
  }
};
