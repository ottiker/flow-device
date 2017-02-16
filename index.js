"use strict"

const fs = require("fs");

exports.read = (path) => {
    return fs.createReadStream(path);
};

exports.write = (path) => {
    return fs.createWriteStream(path);
};
