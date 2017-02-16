"use strict"

const gpio = require("./index");

export.activate = (scope, state, args, stream, next) => {
    gpio.activate(args.gpio);
    next(null, data, stream);
};

export.deactivate = (scope, state, args, stream, next) => {
    gpio.deactivate(args.gpio);
    next(null, data, stream);
};

exports.read = (scope, state, args, data, stream, next) => {
    next(null, data, gpio.read(args.path));
};

exports.write = (scope, state, args, data, stream, next) => {
    stream.pipe(gpio.write(args.path));
    next(null, data, stream);
};
