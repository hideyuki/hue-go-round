var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;

// Dirty global
var bridgeIp;
var userName = process.env.HUE_USER_NAME || "";
var hueApi;
var lightIds = [3, 8, 5, 7, 13, 12, 6, 1, 9, 11, 10, 2, 4];
var index = 0;

// Search bridge
hue.nupnpSearch().then(function(bridges){
  if(bridges.length>0){
    bridgeIp = bridges[0].ipaddress;
    console.log("Bridge IP: " + bridgeIp);

    // create hueApi object
    hueApi = new HueApi(bridgeIp, userName);

    goAround();
  }
}).done();

// hue go around 
function goAround(){
  setInterval(function(){
    setLight(lightIds[index], true);
    setLight(getPreviousLightIdByIndex(index), false);
    index++;
    if(index>=lightIds.length){
      index = 0;
    }
  }, 200);
}

function getPreviousLightIdByIndex(index){
  if(index==0){
    return lightIds[lightIds.length - 1];
  } else {
    return lightIds[index - 1];
  }
}

function setLight(id, sw){
  if(sw){
    console.log(id + ": on");
    hueApi.setLightState(id, lightState.create().rgb(255, 255, 255).on());
  } else {
    console.log(id + ": off");
    hueApi.setLightState(id, lightState.create().off());
  }
}

