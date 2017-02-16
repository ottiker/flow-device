"use strict"

const fs = require("fs");
const path = require("path");
const config = {
    base: "/sys/class/gpio/"
};

exports.activate = (gpio) => {
    fs.createWriteStream(base + 'export').end(gpio)
}; 
exports.deactivate= (gpio) => {
    fs.createWriteStream(base + 'unexport').end(gpio)
}; 

exports.read = (gpio) => {
    return fs.createReadStream(path.resovle(base + gpio));
};

exports.write = (gpio) => {
    return fs.createWriteStream(path.resolve(base + gpio));
};
