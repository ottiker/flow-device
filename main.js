const VERSION = "1.7c",
	w = require("Wifi"),
	SSID = "Joshua's iPhone",
	ssidPassword = "secret99",
	options = {
		port: 1883,
		clean_session: true
	},
	mqtt = require("MQTT").create("test.mosca.io"),
	wemos = {
		D0: "",
		D1: D5,
		D2: D4,
		D3: D0,
		D4: D2,
		D5: D14,
		D6: D12,
		D7: D13
	},
	configMap = [{
		id: "dccbaa81-b2e4-46e4-a2f4-84d398dd86e3",
		pin: wemos.D0,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "e3fe89ab-ead5-46c7-a4fe-93566ad068ee",
		pin: wemos.D1,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "785820c3-42ed-49fd-898f-ce450140d8b6",
		pin: wemos.D2,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "31e86904-1445-4a24-b91d-00810fcf986c",
		pin: wemos.D3,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "828fbaa2-4f56-4cc5-99bf-57dcb5bd85f5",
		pin: wemos.D4,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "fa9e3f66-da33-4618-8035-ba13a30cc737",
		pin: wemos.D5,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "a9bfcb31-655a-4a5a-8ae3-6fa99eac30ec",
		pin: wemos.D6,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "573cda83-d7cf-4480-8fb8-7319c03a4abb",
		pin: wemos.D7,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}, {
		id: "2953533e-47eb-4742-8b30-70d6eefe1885",
		pin: wemos.D8,
		type: "button",
		validCmds: ["on", "off", "getState"]
	}];

function configGen(config) {
	let ret = [];
	config.forEach((el) => {
		let t = {
			device: el.id,
			type: el.type
		};
		ret.push(t);
	});
	return ret;
}
function button(pin, cmd) {
  "compiled";
	if (cmd === "on") {
		digitalWrite(pin, 0);
	} else if (cmd === "off") {
		digitalWrite(pin, 1);
	}
}
function dimmer(pin, value) {
  "compiled";
	analogWrite(pin, value);
}
function connect() {
	w.on("connected", (details) => {
        mqtt.connect();
	});
	w.on("disconnected", (details) => {
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
	mqtt.publish("/test/esp/config", JSON.stringify(configGen(configMap)));
});
mqtt.on("disconnected", () => mqtt.connect());
mqtt.on("publish", (p) => {
	if (p.topic === "/test/esp/cmd") {
		let m = JSON.parse(p.message);
		let d = (map) => {
			for (let x = 0; x < map.length; x++) {
				if (map[x].id === m.device) {
					return map[x];
				}
			}
		};
		button(d(configMap).pin, m.cmd);
	}
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
			w.setSNTP("195.216.64.208", 0);
		} catch (e) {
			console.log(e);
		}
	});
});
