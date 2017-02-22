const VERSION = "1.68",
    w = require('Wifi'),
    esp = require("ESP8266"),
    h = "garden-manager",
    SSID = "Joshua's iPhone",
    ssidPassword = "secret99",
    options = {
        client_id: getSerial(),
        keep_alive: 15,
        ping_interval: 10,
        port: 1883,
        clean_session: true,
        username: "",
        password: "",
        protocol_name: "MQTT",
        protocol_level: 4
    },
    mqtt = require("MQTT").create("test.mosca.io");

function connect() {
    w.on("connected", (details) => {
        console.log("Connected as: " + w.getIP().ip);
        console.log(details);
    });
    w.on("disconnected", (details) => {
        console.log(details);
        w.connect(SSID, {
            password: ssidPassword
        }, function(error) {
            console.log(error);
        });
    });
}
mqtt.on("connected", () => {
    mqtt.publish("/test/esp/log", w.getHostname() + " has connected.");
    mqtt.subscribe("/test/esp/cmd");
    /*publish a JSON stringified capabilities:
    { id: uuid, type: button|dimmer|virtual }, buttons are either on or off, dimmers are always 0.00-1.00.
    if a virtual is required for strings, or multi-command functions (e.g. read, calibrate, reset), that
    can be defined as an additional key when type is virtural, like so:
    var config = {
        id: uuid,
        type: ["button","dimmer","virtual"],
        virtual: {
            cmds: [{
                cmd: "read"
            }, {
                cmd: "calibrate",
                args["now", 7.0]
            }, {
                cmd: "reset"
            }]
        }
    }
    config is created in the flashing, then on connect to mqtt is published. The subscriber (brain), should
    do whatever to present these functions upwards to the app layer.

    If no config is given, the board capabilities *shall* be delivered with buttons and dimmers only.
	*/
});
mqtt.on("disconnected", () => mqtt.connect());
mqtt.on("publish", (p) => {
    console.log("Topic: " + p.topic);
    console.log("Message: " + p.message);
    // parse message and send it to the appropriate function
    // { device: uuid, cmd: on }, send to something like, (x) => { digitalWrite(x.device, cmd) };
    var x = JSON.parse(p.message);
    digitalWrite(x.pin, x.value);
});
E.on("init", () => {
    console.log("Started " + VERSION + ": Connecting...");
    connect();
    w.stopAP();
    w.connect(SSID, {
        password: ssidPassword
    }, function(error) {
        if (error) console.log(error);
        try {
            w.setSNTP('195.216.64.208', 0);
        } catch (e) {
            console.log(e);
        }
        mqtt.connect();
    });
});
