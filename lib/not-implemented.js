/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const Error = require("./error");

class NotImplementedError extends Error {
    constructor() {
        let message, data = {}, error;
        
        let argv = Array.from(arguments);
        let index = argv.findIndex(e => e instanceof Error);
        index >= 0 && (error = argv.splice(index, 1).shift());

        index = argv.findIndex(e => e instanceof Object);
        index >= 0 && (data = argv.splice(index, 1).shift());

        message = argv.shift();

        if (!message) message = "NotImplementedError.";
        else message += " is not implemented."
        super(message, data, error);
    };
}


exports = module.exports = NotImplementedError;