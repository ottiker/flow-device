"use strict"

const gpio = require("./index");

exports.read = (scope, state, args, data, stream, next) => {
    next(null, data, stream.pipe(gpio.read(args.path)));
};

exports.write = (scope, state, args, data, stream, next) => {
    next(null, data, stream.pipe(gpio.write(args.path)));
};
