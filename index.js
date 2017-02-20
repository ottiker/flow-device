"use strict";

const WiFi = require('Wifi');
const WebSocket = require("ws");
const config = JSON.stringify([{"uid":"1","type":"<http://vocab.peePonic.com/waterPump>","api":[{"name":"on","bus":"gpio","pin":4,"direction":"out","value":1},{"name":"off","bus":"gpio","pin":4,"direction":"out","value":0}]},{"uid":"2","type":"<http://vocab.peePonic.com/waterPump>","api":[{"name":"on","bus":"gpio","pin":4,"direction":"out","value":1},{"name":"off","bus":"gpio","pin":4,"direction":"out","value":0}]},{"uid":"3","type":"<http://vocab.peePonic.com/airPump>","api":[{"name":"none"}]},{"uid":"4","type":"<http://vocab.peePonic.com/waterSensor>","api":[{"name":"get","bus":"gpio","pin":"A0"}]}]);

function error(err) {
  console.log(err);
}

module.exports = (deviceConfig) => {
    console.log(deviceConfig);
};

/*wifi.on("connected", () => {
    console.log('Connected as: ' + wifi.getIP().ip);
    var ws = new WebSocket('192.168.0.100', {
        port: 8080,
        path: '/'
    });

    ws.on("open", () => {
        console.log("WEB SOCKET Opened");
        digitalWrite(D2, HIGH);
        ws.send(config);
    });
    ws.on("message", (msg) => {
        console.log(JSON.parse(msg.toString()));
    });
});*/

E.on('init', function() {

  console.log("Started: " + new Date().toString());
  
  // check if wifi is connected
  // else connect
  WiFi.connect("wificonred", {
      password: "95440279"
  }, error);
  WiFi.stopAP();
  // get MCDescriptor from server
  // setup parser
  // ready
});
