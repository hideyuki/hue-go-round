var hue = require("node-hue-api");
var HueApi = require("node-hue-api").HueApi;

// Global
var bridgeIp;
var userName = process.env.HUE_USER_NAME || "";
var hueApi;

if(userName){
  hue.nupnpSearch().then(function(bridge){
    if(bridge.length>0){
      bridgeIp = bridge[0].ipaddress;
      getLightInfo();
    }
  }).done();
} else {
  console.log("Please add the env variable HUE_HOST_NAME");
}

var lightState = hue.lightState;

function getLightInfo(){
  hueApi = new HueApi(bridgeIp, userName);

  hueApi.lights().then(function(result){
    var lights = result.lights;

    var state = lightState.create().on().white(500, 0);

    for(var i=0; i<lights.length; i++){
      var id = lights[i].id;
      hueApi.setLightState(id, state);
    }
  }).done();
}

