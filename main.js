let isOn = false;
const interval = 500; // 500 milliseconds = 0.5 seconds

/**
 * The `main` function gets executed when the board is initialized.
 * Development: npm run dev
 * Production: npm run deploy
 */
const wifi = require('Wifi')
import CONFIG from './wifi.config.json'
const { name: WIFI_NAME, password: WIFI_PASSWORD } = CONFIG
wifi.connect(WIFI_NAME, { password: WIFI_PASSWORD }, error => {
  if (error) console.error(error)
  else console.log(`Connected to: ${ wifi.getIP().ip }`)
})

function main() {
    setInterval(() => {
        isOn = !isOn; // Flips the state on or off
        digitalWrite(D2, isOn); // D2 is the blue LED on the ESP8266 boards
    }, interval);
}
