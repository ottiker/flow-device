"use strict"

const fs = require("fs");
const path = require("path");
const base = "/sys/class/gpio/"

exports.activate = (gpio) => {
    fs.createWriteStream(base + 'export').end(gpio.toString())
}; 
exports.deactivate= (gpio) => {
    fs.createWriteStream(base + 'unexport').end(gpio.toString())
}; 

exports.read = (gpio) => {
    return fs.createReadStream(path.resolve(base + gpio));
};

exports.write = (gpio) => {
    return fs.createWriteStream(path.resolve(base + gpio));
};
