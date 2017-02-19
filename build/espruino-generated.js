'use strict';

var name = "wificonred";
var password = "95440279";
var CONFIG = {
	name: name,
	password: password
};

var isOn = false;
var interval = 500;
var wifi = require('Wifi');
var WIFI_NAME = CONFIG.name;
var WIFI_PASSWORD = CONFIG.password;

wifi.connect(WIFI_NAME, { password: WIFI_PASSWORD }, function (error) {
    if (error) console.error(error);else console.log('Connected to: ' + wifi.getIP().ip);
});
function main() {
    setInterval(function () {
        isOn = !isOn;
        digitalWrite(D2, isOn);
    }, interval);
}
main();
