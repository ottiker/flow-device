const VERSION = "1.67",
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
});
mqtt.on("disconnected", () => mqtt.connect());
mqtt.on("publish", (p) => {
    console.log("Topic: " + p.topic);
    console.log("Message: " + p.message);
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
